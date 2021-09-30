import React ,{useContext, useEffect, useState} from 'react'
import {Link} from 'react-router-dom'

import "./DetailProduct.css"
function DetailProduct() {

    return (
       
       
         <div className="product_box">
            {
            <input type="checkbox" />
            }
            <img height="20%" width="20%" src={'/static/images/basil.jpg'}/>

            <div className="product_box">
                <h2>Title</h2>

                <h1>Rs.100.00</h1>
                <p>description</p>

            </div>
            <div className="row_btn" >
                {  <>
                 <Link  id="btn_buy" to="#!" onClick>
                    BUY
                </Link>
                <Link id="btn_view" to="/">
                    View
                </Link>
                </>
                }
            </div>
    
        </div>
  
    )
}

export default DetailProduct