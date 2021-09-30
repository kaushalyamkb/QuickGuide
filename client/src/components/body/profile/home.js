import React from 'react' 
import {Link} from 'react-router-dom'


function home(){
    return(
        <div className="profile_page ">  
<div>
           <center>
           <h1><u>SuperMarket Management Syatem</u></h1>
           <br></br>
               <h1>welcome !!!</h1></center>
                <br></br>


               <h6> Enter Sri Lanka's freshest online grocery store for all your grocery needs- fresh to frozen and everything in between! Now, you can order ALL your daily necessities from the comfort of your home or
                 anywhere you want! Choose from same-day, next-day and saver to ensure you get what you need when you need it.
               </h6>

               <br></br>
               <center>
               <img height="0%" width="50%" src={'/static/images/imd123.gif'}/>
                       </center>
                    <br></br>
                    <div className="black">   
                   
<center>
                    <table className="center">
                    <br></br><br></br><br></br> <tr>
                        <td><img height="10%" width="10%" src={'/static/images/D4.jpg'}/></td>
                        <td><img  height="10%" width="10%" src={'/static/images/D5.jpg'}/> </td>
                        <td><img  height="10%" width="10%" src={'/static/images/D6.jpg'}/> </td>
                        

                        </tr>

                        <tr>
                        <td>Best Prices & Offers</td>

                        <td>Wide Assortment</td>
                        <td>Easy Returns</td>
                    

                        </tr>
                        <tr>
                        <td>Enjoy the same lowest prices as your local SuperMarket, Express &
                                 Food Hall store!</td>

                        <td>Choose from a variety of products from branded, chilled, fresh & frozen. New products added weekly!</td>
                        <td>Not satisfied with a product? Return it at the doorstep & get a refund within hours.</td>
                    

                        </tr><br></br><br></br><br></br><br></br><br></br><br></br>
                    </table><br></br><br></br>
                    
</center>
<br></br><br></br>
</div>
</div>

<br></br>
    <img height="0%" width="100%" src={'/static/images/test.png'}/>
 
        <div>

<div>

<br></br>
<center><h4><u>Other Services</u> </h4></center>

<div className="serviceStyleHome">
<h4>Delivery Services</h4>
<br></br>

<p><h6>
    Deliveries can lead to a customer planning their day around it, 
    so providing a time slot for delivery can ensure customers are 
    satisfied with their experience and will shop with you again
    </h6></p>

    <div className="profile_page ">     
        <div className="col-left21">
            <Link to="/">
             <button onclick="/">Set Delivery Services</button>
            </Link>

        </div>
    </div>

<br></br><br></br><br></br>
   
    <br></br><br></br><br></br>
    <h4>Payment Services</h4>
<br></br>

<p><h6>
            A transaction account allows people to take advantage of different (electronic)
            ways to send or receive payments, and it can serve as a gateway to other financial products, 
            such as credit, saving and insurance. Payment services are usually the first and typically 
            most often used financial service.
    </h6></p>

    <div className="profile_page ">     
        <div className="col-left21">
            <Link to="/">
             <button onclick="/">Manage Payment</button>
            </Link>

        </div>
    </div>



    <br></br><br></br><br></br>
    <h4>EXTRA</h4>
    <table border="2" align="center" width="100%">
<br></br>
<tr>
    <td>
 <div className="profile_page ">     
        <div className="col-left21">
            <Link to="/">
             <button onclick="/">Administration Management </button>
            </Link>

        </div>
    </div>
    </td>

    <td>
 <div className="profile_page ">     
        <div className="col-left21">
            <Link to="/profile">
             <button onclick="/profile">User Management </button>
            </Link>

        </div>
    </div>
    </td>

   
</tr>
</table>

</div>
        </div>
        </div>

        <br></br>
    <img height="0%" width="100%" src={'/static/images/test2.png'}/>

    
<div className="serviceStyleHome">


       
   

<br></br><br></br><br></br>
    <h4>FeedBack Services</h4>
<br></br>

<p><h6>
                Customer feedback is essential to guide and inform your
                decision making and influence innovations and changes to your product or service.
                It's also essential for measuring customer 
                satisfaction among your current customers. Getting a handle on how customers
                view your product, support, and the company is invaluable.
    </h6></p>

    <div className="profile_page ">     
        <div className="col-left21">
            <Link to="/">
             <button onclick="/">Add feedback</button>
            </Link>

        </div>
    </div>



    <br></br><br></br><br></br>
   


    <br></br><br></br><br></br>
    <h4>Supplier Services</h4>
<br></br>

<p><h6>
At the most basic level, an enterprise needs suppliers either to provide the resources for the products or services it sells, or to supply resources needed to run the business.
 The key advantage of strong, healthy supplier relationships is that you can gain better value for your business.
    </h6></p>

    <div className="profile_page ">     
        <div className="col-left21">
            <Link to="/">
             <button onclick="/">Are You A Supplier ? </button>
            </Link>

        </div>
    </div>

    <br></br><br></br><br></br>
    <h4>EXTRA</h4>
    <table border="2" align="center" width="100%">
<br></br>
<tr>
    <td>
 <div className="profile_page ">     
        <div className="col-left21">
            <Link to="/">
             <button onclick="/">Administration Management </button>
            </Link>

        </div>
    </div>
    </td>

    <td>
 <div className="profile_page ">     
        <div className="col-left21">
            <Link to="/profile">
             <button onclick="/profile">User Management </button>
            </Link>

        </div>
    </div>
    </td>

    <td>
 <div className="profile_page ">     
        <div className="col-left21">
            <Link to="/">
             <button onclick="/">Quality Test</button>
            </Link>

        </div>
    </div>
    </td>
</tr>
</table>
</div>
<div>
   
    </div> <br></br><br></br>


    
        </div>
        
     
    )
}

export default home