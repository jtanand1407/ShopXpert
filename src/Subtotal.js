import React from 'react';
import "./Subtotal.css";
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from './StateProvider'
import { subBasketTotal } from './reducer'
import {useNavigate} from 'react-router-dom'

function Subtotal() {
  const navigate=useNavigate();
  const [{basket} ,dispatch]=useStateValue();
  
  return (
    <div className='subtotal'>
      <CurrencyFormat
        renderText={(value) => (
          <>
          <div className="subtotal__items">
          Subtotal ({basket.length} Items): <strong>{value}</strong>
      </div>
      <div className="subtotal__checkbox">
         <input type="checkbox"/> This order contains a gift
      </div>
      <div className="subtotal__button">
         <button onClick={e=> navigate('/payment')} className='button'>Proceed To Checkout</button>
      </div>
          </>
          
        )}
        decimalScale={2}
        value={subBasketTotal(basket)}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"₹"}
       /> 
    </div>
  )
}

export default Subtotal;