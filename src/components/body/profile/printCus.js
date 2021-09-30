import React, {useState, useEffect} from 'react' 
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom'

import {fetchAllUsers, dispatchGetAllUsers} from '../../../redux/actions/usersAction'




const initialState = {
    name: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}




 
function PrintCus() {

    const auth = useSelector(state => state.auth)
    const token = useSelector(state => state.token)

    const users = useSelector(state => state.users)

    const {user, isAdmin} = auth
    const [data, setData] = useState(initialState)
    const {name, password, cf_password, err, success} = data

  

    const dispatch = useDispatch()
    useEffect(() => {
        if(isAdmin){
            fetchAllUsers(token).then(res =>{
                dispatch(dispatchGetAllUsers(res))
            })
        }
    },[token, isAdmin, dispatch])


return(
  
    <>


<html> 
<br></br>
<Link to="/profile">
<button> back to profile </button></Link>
<center>
<button class="kc_fab_main_btn">Print this Out . <i class="fas fa-print"></i></button>
</center>
<br></br>
<h6>PDF page size : A4  |</h6>
<h6>Page no: 1 out of 1 |</h6>
<div class="book">
  <div class="page">
<div className="">

        <br></br>
        <div className="">
        <center>
<h4>My data</h4>

</center>
</div>
        <br></br>
      
        <table className = "customers2">
    <tr>
                <th>ID</th>
                <td>{user._id}</td>
  </tr>

  <tr>
                <th>Current Email</th>
                <td>{user.email}</td>
  </tr>

  <tr>
                <th>Name</th>
                <td>{user.name}</td>
  </tr>

  <tr>
                <th>Status</th>
                <td>{
                     user.role === 1
                     ? <h6>Manager</h6>
                     : <h6>User</h6>
                }</td>
  </tr>

 
 
</table>
</div>


<div>

<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
<hr className="class-2"></hr>
<br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
<h5>Other Details</h5>
<h6>Only for User Managers</h6>
<br></br>
</div>
    <div className="profile_page ">
    <div className="col-left20">
</div>
</div>

<br></br>

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
</html>
        </>
)
    
}

export default PrintCus