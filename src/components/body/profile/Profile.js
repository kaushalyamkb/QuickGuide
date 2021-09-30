import React, {useState, useEffect, Component} from 'react' 
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'
import {isLength, isMatch} from '../../utils/validation/Validation'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'


const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}




 
function Profile() {
    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const users = useSelector(state => state.users)

    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const {name, password, cf_password, err, success} = data

    const [avatar, setAvatar] = useState(false)
    const [loading, setLoading] = useState(false)
    const [callback, setCallback] = useState(false)

    const dispatch = useDispatch()
    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch, callback])

    const handleChange = e => {
        const {name, value} = e.target
        setData({...data, [name]:value, err:'', success: ''})
    }

const changeAvatar = async(e) => {
    e.preventDefault()
    try {
        const file = e.target.files[0]

        if(!file) return setData({...data, err: "No files were uploaded." , success: ''})

        if(file.size > 1024 * 1024) //1mb
            return setData({...data, err: "Size too large." , success: ''})

        if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return setData({...data, err: "File format is incorrect." , success: ''})

        let formData =  new FormData()
        formData.append('file', file)

        setLoading(true)
        const res = await axios.post('/api/upload_avatar', formData, {
            headers: {'content-type': 'multipart/form-data', Authorization: token}
        })

        setLoading(false)
        setAvatar(res.data.url)
        
    } catch (err) {
        setData({...data, err: err.response.data.msg , success: ''})
    }
}





const updateInfor = () => {
    try {
        axios.patch('/user/update', {
            name: name ? name : user.name,
            avatar: avatar ? avatar : user.avatar
        },{
            headers: {Authorization: token}
        })

        setData({...data, err: '' , success: "Updated Success!"})
    } catch (err) {
        setData({...data, err: err.response.data.msg , success: ''})
    }
}



const updatePassword = () => {
    if(isLength(password))
        return setData({...data, err: "Password must be at least 6 characters.", success: ''})

    if(!isMatch(password, cf_password))
        return setData({...data, err: "Password did not match.", success: ''})

    try {
        axios.post('/user/reset', {password},{
            headers: {Authorization: token}
        })

        setData({...data, err: '' , success: "Updated Success!"})
    } catch (err) {
        setData({...data, err: err.response.data.msg , success: ''})
    }
}

const handleUpdate = () => {
    if(name || avatar) updateInfor()
    if(password) updatePassword()
}

const handleDelete = async (id) => {
    try {
        if(user._id == id){
            if(window.confirm("Are you sure you want to delete this account?")){
                setLoading(true)
                await axios.delete(`/user/delete/${id}`, {
                    headers: {Authorization: token}
                })
                setLoading(false)
                setCallback(!callback)
            }
        }
        
    } catch (err) {
        setData({...data, err: err.response.data.msg , success: ''})
    }
}


const handleDeleteMng = async (id) => {
    try {
        if(user._id !== id){
            if(window.confirm("Are you sure you want to delete this account?")){
                setLoading(true)
                await axios.delete(`/user/delete/${id}`, {
                    headers: {Authorization: token}
                })
                setLoading(false)
                setCallback(!callback)
            }
        }
        
    } catch (err) {
        setData({...data, err: err.response.data.msg , success: ''})
    }
}




    return(
<>
            
        <div>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            {loading && <h3>Loading.....</h3>}
        </div>



        <div className ="profile_page">

<div className="col-left">
            <h2><u>{isAdmin ? "Admin Profile": "User Profile"}</u></h2>

                <div className="avatar">

                <img src={avatar ? avatar : user.avatar} alt=""/>
                <span>
                 <i className="fas fa-camera"></i>
                 <p>Change</p>
                 <input type="file" name="file" id="file_up" onChange={changeAvatar}/>
                </span>
                </div>
                <div className="col-left2">
                <div className="form-group">
                    <label htmlFor="name">Your ID</label>
                    <input type="id" name="id" id="id" defaultValue={user._id}
                    placeholder="Your id" disabled />
                </div>
                </div>

                <div className="col-left2">
                <div className="form-group">
                    <label htmlFor="email">Your Email</label>
                    <input type="email" name="email" id="email" defaultValue={user.email}
                    placeholder="Your email address" disabled />
                </div>
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" defaultValue={user.name}
                    placeholder="Your Name" onChange={handleChange} />
                </div>

               

                <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input type="password" name="password" id="password"
                    placeholder="Your password" value={password} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="cf_password">Confirm New Password</label>
                    <input type="password" name="cf_password" id="cf_password"
                    placeholder="Confirm password" value={cf_password} onChange={handleChange} />
                </div>


                <div>
                   
                    <em style={{color: "crimson"}}> 
                    <h6>
                    * you can  change only the red color parts in the form..
                        </h6>
                    </em>
                   
                </div>
        <div className="col-left12">
                <button disabled={loading} onClick={handleUpdate} >Update Data <i class="fas fa-pen"></i></button>

         </div>
</div>                  


<div><br></br><br></br></div>
            

          

<div className="col-right">
            <br></br> 

        <div class="rightNav">
            <input type="text" name="search" id="search" placeholder="Type to search..."/>
            <button class="btn btn-sm">Search  <i class="fas fa-search"></i> </button>
        </div>


        <h2>{isAdmin ? "Your role : User Manager (1)" : "Your Role : User (0)" } </h2>

            <div style={{overflowX: "auto"}}>
                <table className = "customers">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Manager</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                {
                                  user.role === 1
                                  ? <i className="fas fa-check" title="User Manager"></i>
                                 : <i className="fas fa-times" title="User"></i>
                                 }
                            </td>
                                    
                            <td>
                                 <i className="fas fa-trash-alt" title="Remove"
                                onClick={() => handleDelete(user._id)} ></i>
                            </td>
                        </tr>        
                    </tbody>
                </table>

<br></br>


<hr className="class-2"></hr>

<br></br>


    <div style={{float: 'left'}}>

        <tbody>
            <h4>Edit Other Users </h4>
            <h6>This will only work if you are a manager of user management</h6>
        </tbody>
    </div>

    <table className = "customers">
        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Manager</th>
                            <th>Action</th>
                        </tr>
        </thead>
         <tbody>


                    {
                            users.map(user => (
                                    <tr key={user._id}>


                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                    {
                                                user.role === 1
                                                ? <i className="fas fa-check" title="Admin"></i>
                                                : <i className="fas fa-times" title="User"></i>
                                            }
                                    </td>
                                    <td>
                                        <Link to={`/edit_user/${user._id}`}>
                                            <i className="fas fa-edit" title="Edit"></i>
                                            </Link>
                                            <i className="fas fa-trash-alt" title="Remove"
                                            onClick={() => handleDeleteMng(user._id)} ></i>
                                            </td>
                                 </tr>
                            ))
                        }
                        
        </tbody> 
    </table>
  </div>
</div>

</div>

<br></br>

<center><h4><u>User report</u></h4></center>

<br></br>

<h6>This is only a preview. Select "genarate report" button for more...</h6>
<br></br>

        <div class="rowf">
            <div class="column">
                <div class="html1">
                    <div class="html1">
                        <div className="davet">

        <br></br>

                        <div className="html1">
                                <center>
                                    <h4>My data</h4>

                                </center>
                        </div>
        <br></br>
      
        <table className = "customers2">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Your Role(0,1)</th>                
            </tr>

            <tr>
            <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td> {
                         user.role === 1
                         ? <h6>Manager</h6>
                         : <h6>User</h6>
                }
            </td>
            </tr>
        </table>

<br></br><br></br><br></br>

   <h5>Other details</h5>

<br></br><br></br>

<div>
<table className = "customers2">
<thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                            
                        </tr>
                    </thead>
                    <tbody>


                    {
                            users.map(user => (
                                    <tr key={user._id}>


                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                    {
                                                user.role === 1
                                                ? <h6>Manager</h6>
                                                : <h6>User</h6>
                                            }
                                    </td>
                                    
                                 </tr>
                            ))
                        }
                    </tbody> 
</table>
</div>
</div>
</div>
</div>
<br></br><br></br>    
</div>


        <div class="column">
            <center>
                <div className="profile_page ">
                     <div className="col-left20">
                            <Link to="/PrintCus">
                            <button >Genarate Report   . <i class="fas fa-print"></i></button>
                            </Link>
 
                        </div>
                    </div>
                </center>
            </div>
        </div>
      
        </>
    )   
}

export default Profile