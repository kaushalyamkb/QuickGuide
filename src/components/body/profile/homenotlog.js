import React from 'react' 
import {Link} from 'react-router-dom'


function homenotlog(){
    return(
        <div className="login_page">
            <h2>Staff Login</h2>
           

            <form >
                    <br></br>
                    <br></br>
                <div>
                    <label htmlFor="emil">Email Address</label>
                    <input type="text" placeholder="Enter Email address" id="email"
                    name="email" />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Enter password" id="password"
                    name="password" />
                </div>

                <div className = "row">
                    <button type="submit">Login</button>
                    <Link to="/forgot_password">Forgot your Password?</Link>
                </div>



            </form>

            <div className="hr">Or Login With</div>
                        <div className="social">
                        <button><b>Login with google</b></button></div>
                        <br></br>
                        <div className="social">
                        <button><b>Login with facebook</b></button>
</div>
                                        
                        
            <p>New to staff ? <Link to="/register">Register</Link></p>
        </div>


    )
}

export default homenotlog