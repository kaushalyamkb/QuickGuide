import React from 'react'
import{Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'




function Header(){
    const auth = useSelector(state => state.auth)
    
    const {user, isLogged} = auth

    const handleLogout = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = "/login";
        } catch (err) {
            window.location.href = "/";
        }
    }
   
    const userLink = () => {
        return <li className = "drop-nav">
            <Link to="#" className = "avatar">
                <img src={user.avatar} alt="" /> {user.name} <i className="fas fa-chevron-down"></i>
            </Link>

            <ul className="dropdown">
                <li><Link to="/profile">Profile</Link></li>
                <li><Link to="/" onClick={handleLogout}>LogOut</Link></li>
            </ul>
        </li>
    }

    const transForm = {
        transform: isLogged ? "translateY(-5px)" : 0
    }

    return (
       <header>

           <div className="logo headerName">
                <h1><i class="fas fa-leaf"></i> . <i>SuperMarket</i></h1>
           </div>

           <ul style={transForm}>
           <li><Link to="/home"><i className="fas fa-home"></i>Home</Link></li>
                <li><Link to="/ProductSample"><i class="fas fa-gifts"></i>Products</Link></li>
                <li><Link to="/about"><i class="fas fa-info"></i>About</Link></li>
                <li><Link to="/homenotlog"><i class="fas fa-users"></i>Staff</Link></li>
                 <li><Link to="/cart"><i className="fas fa-shopping-cart"></i>Cart</Link></li>
                           
                           
                            {
                                isLogged
                                ? userLink()
                                :  <li><Link to="/login"><i className="fas fa-user"></i>Sign in</Link></li>
                            }
           </ul>   
       </header>

    )
}

export default Header