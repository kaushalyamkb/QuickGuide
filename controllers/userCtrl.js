const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const {google} = require('googleapis')
const {OAuth2} = google.auth
const fetch = require('node-fetch')

const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID)

const {CLIENT_URL} = process.env

const userCtrl = {

//register customer part - starting 

    register: async (req, res) => {
        try {
            const {name, email, password} = req.body
            
            //validation - if name,email,password fields are null, return this message...
            if(!name || !email || !password)
                return res.status(400).json({msg: "Please fill in all fields."})

                //validation - check the email format . if it is not match, return this message ...
            if(!validateEmail(email))
                return res.status(400).json({msg: "Invalid emails."})

                 //validation - check the database, and if there is a similer email, return this message...
            const user = await Users.findOne({email})
            if(user) return res.status(400).json({msg: "This email already exists."})

            //validation- check the password length, if it is less than 6, return this message..
            if(password.length < 6)
                return res.status(400).json({msg: "Password must be at least 6 characters."})

                //validation - bycript the password
            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = {
                name, email, password: passwordHash
            }

            const activation_token = createActivationToken(newUser) //create new constant variable for activation-token

            const url = `${CLIENT_URL}/user/activate/${activation_token}`    //activation mail sending 
            sendMail(email, url, "Verify your email address") //email body button


            res.json({msg: "Register Success! Please activate your email to start."})   // activation mail sent successfuly 
        } catch (err) {
            return res.status(500).json({msg: err.message}) // if err, show it
        }
    },

    //email activation

    activateEmail: async (req, res) => {
        try {
            const {activation_token} = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)  //verify the activation token

            const {name, email, password} = user

            //check if this e mail already exists or not. if yes show this err message...
            const check = await Users.findOne({email})
            if(check) return res.status(400).json({msg:"This email already exists."})

            const newUser = new Users({
                name, email, password
            })

            await newUser.save() //save user details

            res.json({msg: "Account has been activated!"}) //show success message...

        } catch (err) {
            return res.status(500).json({msg: err.message}) // if err while saving details,  show it...
        }
    },

     //login part
    login: async (req, res) => {
        try {
            const {email, password} = req.body


            //login validation
            //check the db and find the email.
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."}) //if there is no such an email , show this err message.

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})  //if the password incorrect show this message...

            const refresh_token = createRefreshToken({id: user._id})  //get refresh token
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7*24*60*60*1000 // refresh token max age = 7 days
            })

            res.json({msg: "Login success!"}) //if all ok, show success message
        } catch (err) {
            return res.status(500).json({msg: err.message})  // if there is an err , show it
        }
    },

    //get access token part


    /*
    public route that accepts HTTP POST requests with a refresh token cookie. 
    If the cookie exists and the refresh token is valid then a new JWT authentication token 
    and the user details are returned in the response body, 
    a new refresh token cookie (HTTP Only) is returned in the response headers and the old refresh token is revoked.

    */
    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if(!rf_token) return res.status(400).json({msg: "Please login now!"}) //if refresh token part complete show this

            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({msg: "Please login now!"}) //veryfy jwt

                const access_token = createAccessToken({id: user.id})
                res.json({access_token})
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //starting forgot password part

    forgotPassword: async (req, res) => {
        try {
            const {email} = req.body
            const user = await Users.findOne({email})
            if(!user) return res.status(400).json({msg: "This email does not exist."})  //check the database, if the email add. not there, show this

            const access_token = createAccessToken({id: user._id})
            const url = `${CLIENT_URL}/user/reset/${access_token}`   //call the path

            sendMail(email, url, "Reset your password")    //re set email 
            res.json({msg: "Re-send the password, please check your email."}) //if all ok show this
        } catch (err) {
            return res.status(500).json({msg: err.message}) //if not show this err msg
        }
    },

    //reset password part
    resetPassword: async (req, res) => {
        try {
            const {password} = req.body
            console.log(password) //show password in the console
            const passwordHash = await bcrypt.hash(password, 12)  //by cript the password

            await Users.findOneAndUpdate({_id: req.user.id}, {   //find the password and update
                password: passwordHash
            })

            res.json({msg: "Password successfully changed!"}) //if all ok show this
        } catch (err) {
            return res.status(500).json({msg: err.message}) //if not show this err
        }
    },

    //get user information
    getUserInfor: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select('-password') //find the user by id

            res.json(user) //show the data
        } catch (err) {
            return res.status(500).json({msg: err.message}) //if err show this
        }
    },

    //get all user informations
    getUsersAllInfor: async (req, res) => {
        try {
            const users = await Users.find().select('-password') //find details by id

            res.json(users)  //show details
        } catch (err) {
            return res.status(500).json({msg: err.message}) //if err, show it
        }
    },

    //logout part

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', {path: '/user/refresh_token'})  // The res. clearCookie() function is used to clear the cookie specified by name
            return res.json({msg: "Logged out."})  //if ok show this message
        } catch (err) {
            return res.status(500).json({msg: err.message}) //if err show it
        }
    },

    //update user part
    updateUser: async (req, res) => {
        try {
            const {name, avatar} = req.body
            await Users.findOneAndUpdate({_id: req.user.id}, {   //find the user by id and update
                name, avatar //update name and avetar
            })

            res.json({msg: "Update Success!"}) //if ok show success
        } catch (err) {
            return res.status(500).json({msg: err.message}) //if err, show it
        }
    },

    //update user role part
    updateUsersRole: async (req, res) => {
        try {
            const {role} = req.body

            await Users.findOneAndUpdate({_id: req.params.id}, {   //find the user and update the the role
                role //only role
            })

            res.json({msg: "Update Success!"})  //success msg
        } catch (err) {
            return res.status(500).json({msg: err.message}) //err msg
        }
    },

    //delete user part
    deleteUser: async (req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id) //find the id and delete

            res.json({msg: "Deleted Success!"}) //success msg
        } catch (err) {
            return res.status(500).json({msg: err.message}) //err msg
        }
    },
    googleLogin: async (req, res) => {
        try {
            const {tokenId} = req.body

            const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.MAILING_SERVICE_CLIENT_ID})
            
            const {email_verified, email, name, picture} = verify.payload

            const password = email + process.env.GOOGLE_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

            const user = await Users.findOne({email})

            if(user){
                const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

                const refresh_token = createRefreshToken({id: user._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }else{
                const newUser = new Users({
                    name, email, password: passwordHash, avatar: picture
                })

                await newUser.save()
                
                const refresh_token = createRefreshToken({id: newUser._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }


        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    facebookLogin: async (req, res) => {
        try {
            const {accessToken, userID} = req.body

            const URL = `https://graph.facebook.com/v2.9/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`
            
            const data = await fetch(URL).then(res => res.json()).then(res => {return res})

            const {email, name, picture} = data

            const password = email + process.env.FACEBOOK_SECRET

            const passwordHash = await bcrypt.hash(password, 12)

            const user = await Users.findOne({email})

            if(user){
                const isMatch = await bcrypt.compare(password, user.password)
                if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

                const refresh_token = createRefreshToken({id: user._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }else{
                const newUser = new Users({
                    name, email, password: passwordHash, avatar: picture.data.url
                })

                await newUser.save()
                
                const refresh_token = createRefreshToken({id: newUser._id})
                res.cookie('refreshtoken', refresh_token, {
                    httpOnly: true,
                    path: '/user/refresh_token',
                    maxAge: 7*24*60*60*1000 // 7 days
                })

                res.json({msg: "Login success!"})
            }


        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}





function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {expiresIn: '5m'})
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}

module.exports = userCtrl