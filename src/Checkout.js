import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import CheckoutProduct from "./CheckoutProduct";
import { useStateValue } from "./StateProvider";

function Checkout() {
  const [{ basket ,user }, dispatch] = useStateValue();

  return (
    <div className="checkout">
      <div className="checkout__left">
        <div className="bottom__line">
          <h3>{user ? `Hello, ${user?.email}` : ""}</h3>
          <h2>Your Shopping Basket</h2>
        </div>
        <div className="checkproduct__items">
          {basket.map((item) => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              price={item.price}
              rating={item.rating}
              image={item.image}
            />
          ))}
        </div>
      </div>

      <div className="checkout__right">
        <h2>Cart Summary</h2>
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
