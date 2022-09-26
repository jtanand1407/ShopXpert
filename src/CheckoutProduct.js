import React from "react";
import "./CheckoutProduct.css";
import {useStateValue} from './StateProvider'

function CheckoutProduct({ id , title, price, rating, image , hidebutton }) {
  const [{ basket }, dispatch] = useStateValue();

  const removeFromBasket = () => {
      dispatch({
        type: "Remove_From_Basket",
        id: id,
      })
  };

  return (
    <div className="checkoutProduct">
        <div className="checkoutproduct__image">
        <img className="checkoutproduct__img" src={image} />
        </div>
        
      
      <div className="checkoutProduct__info">
        <p>
          <h5>{title}</h5>
        </p>
        <p>
          <strong>₹ {price}</strong>
        </p>
        <p className="checkoutproduct__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </p>
        <p>
          {!hidebutton && <button className="checkoutproduct__button" onClick={removeFromBasket}>Remove the item</button>}
        </p>
      </div>
    </div>
  );
}

export default CheckoutProduct;
