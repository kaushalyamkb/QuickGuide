import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './auth/Login'
import Register from './auth/Register'
import ActivationEmail from './auth/ActivationEmail'
import NotFound from '../utils/NotFound/NotFound'

import ForgotPass from '../body/auth/ForgotPassword'
import ResetPass from '../body/auth/ResetPassword'

import Profile from '../body/profile/Profile'
import EditUser from '../body/profile/EditUser'



import home from '../body/profile/home'

import about from '../body/profile/about'

import homenotlog from '../body/profile/homenotlog'
import PrintCus from './profile/printCus'

import ProductSample from '../body/products/productSample'



import {useSelector} from 'react-redux'


function Body() {
    const auth = useSelector(state => state.auth)
    const {isLogged, isAdmin} = auth
    return (
        <section>
            <Switch>
                <Route path="/home" component={home} exact />

                <Route path="/login" component={isLogged ? NotFound : Login} exact />
                
                <Route path="/register" component={isLogged ? NotFound : Register} exact />

                <Route path="/forgot_password" component={isLogged ? NotFound : ForgotPass} exact />
                <Route path="/user/reset/:token" component={isLogged ? NotFound : ResetPass} exact />

                <Route path="/user/activate/:activation_token" component={ActivationEmail} exact />

                <Route path="/profile" component={isLogged ? Profile : NotFound} exact />
             
                <Route path="/about" component={about } exact />

                <Route path="/homenotlog" component={ homenotlog} exact />
                <Route path="/printCus" component={ PrintCus} exact />
               <Route path="/ProductSample" component={ProductSample} />
                

                <Route path="/edit_user/:id" component={isAdmin ? EditUser : NotFound} exact />


               

            </Switch>
        </section>
    )
}

export default Body
