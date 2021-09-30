import React  from 'react'
import {Link} from 'react-router-dom'

//import "./DetailProduct.css"
function ProductSample() {

    return (
       
       
         <div className="product_box">
           

           
            <div className="row_btn" >
               


<table border="2" bordercolor="white" align="center" width="100%">
<tr>
<td>
            {
            <input type="checkbox" />
            }
            <img height="50%" width="50%" src={'/static/images/basil.jpg'}/>

          
                <h2>Title</h2>

                <h1>Rs.100.00</h1>
                <p>description</p>

            
                {  <>
                 <Link  id="btn_buy" to="#!" onClick>
                    BUY
                </Link>
                <br></br>
                <Link id="btn_view" to="/">
                    View
                </Link>
                </>
                }</td>
<td>
            {
            <input type="checkbox" />
            }
            <img height="50%" width="50%" src={'/static/images/basil.jpg'}/>

          
                <h2>Title</h2>

                <h1>Rs.100.00</h1>
                <p>description</p>

            
                {  <>
                 <Link  id="btn_buy" to="#!" onClick>
                    BUY
                </Link>
                <Link id="btn_view" to="/">
                    View
                </Link>
                </>
                } </td>
<td>
            {
            <input type="checkbox" />
            }
            <img height="50%" width="50%" src={'/static/images/basil.jpg'}/>

          
                <h2>Title</h2>

                <h1>Rs.100.00</h1>
                <p>description</p>

            
                {  <>
                 <Link  id="btn_buy" to="#!" onClick>
                    BUY
                </Link>
                <Link id="btn_view" to="/">
                    View
                </Link>
                </>
                } </td>
<td>
            {
            <input type="checkbox" />
            }
            <img height="50%" width="50%" src={'/static/images/basil.jpg'}/>

          
                <h2>Title</h2>

                <h1>Rs.100.00</h1>
                <p>description</p>

            
                {  <>
                 <Link  id="btn_buy" to="#!" onClick>
                    BUY
                </Link>
                <Link id="btn_view" to="/">
                    View
                </Link>
                </>
                } </td>

</tr>

<tr>
<td>
            {
            <input type="checkbox" />
            }
            <img height="50%" width="50%" src={'/static/images/basil.jpg'}/>

          
                <h2>Title</h2>

                <h1>Rs.100.00</h1>
                <p>description</p>

            
                {  <>
                 <Link  id="btn_buy" to="#!" onClick>
                    BUY
                </Link>
                <Link id="btn_view" to="/">
                    View
                </Link>
                </>
                }</td>
<td>
            {
            <input type="checkbox" />
            }
            <img height="50%" width="50%" src={'/static/images/basil.jpg'}/>

          
                <h2>Title</h2>

                <h1>Rs.100.00</h1>
                <p>description</p>

            
                {  <>
                 <Link  id="btn_buy" to="#!" onClick>
                    BUY
                </Link>
                <Link id="btn_view" to="/">
                    View
                </Link>
                </>
                }</td>
<td>
            {
            <input type="checkbox" />
            }
            <img height="50%" width="50%" src={'/static/images/basil.jpg'}/>

          
                <h2>Title</h2>

                <h1>Rs.100.00</h1>
                <p>description</p>

            
                {  <>
                 <Link  id="btn_buy" to="#!" onClick>
                    BUY
                </Link>
                <Link id="btn_view" to="/">
                    View
                </Link>
                </>
                }</td>
<td>
            {
            <input type="checkbox" />
            }
            <img height="50%" width="50%" src={'/static/images/basil.jpg'}/>

          
                <h2>Title</h2>

                <h1>Rs.100.00</h1>
                <p>description</p>

            
                {  <>
                 <Link  id="btn_buy" to="#!" onClick>
                    BUY
                </Link>
                <Link id="btn_view" to="/">
                    View
                </Link>
                </>
                }</td>

</tr>
</table>
<br></br>
            </div>
    
        </div>
  
    )
}

export default ProductSample