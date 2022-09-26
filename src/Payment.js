import React, { useEffect, useState } from "react";
import { useStateValue } from "./StateProvider";
import "./Payment.css";
import { useNavigate} from "react-router-dom"
import CheckoutProduct from "./CheckoutProduct";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { subBasketTotal } from "./reducer";
import axios from './axios';
import { db } from "./firebase";


function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const navigate=useNavigate();

  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() =>{
    const getClientSecret = async () => {
        const response= await axios({
          method: 'post',
          url: `/payment/create?total=${subBasketTotal(basket) *100}`
        });
        setClientSecret(response.data.clientSecret)
    }
    getClientSecret();
  },[basket]);

  console.log('Hey your secret key >>>',clientSecret)

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload= await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card:elements.getElement(CardElement)
      }
    }).then(({paymentIntent} ) => {

      db
       .collection('users')
       .doc(user?.uid)
       .collection('orders')
       .doc(paymentIntent.id)
       .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created
       })


      setSucceeded(true);
      setError(null);
      setProcessing(false);

      dispatch({
        type : "EMPTY_BASKET"
      })

      navigate('/orders')
    })
  };

  const handleChange = (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  return (
    <div className="payment">
      <h1>Checkout ({basket.length} items)</h1>

      <div className="payment__container">
        <div className="payment__section">
          <h1>Delivery Address</h1>
          <div className="payment__address">
            <p>{user ? user.email : "Hello Guest"}</p>
            <p>D-88, Kurmanchal Nagar, Indira Nagar, Lucknow.</p>
          </div>
        </div>
        <div className="payment__section">
          <h1>Review items and delivery</h1>
          <div className="payment__items">
            {basket.map((items) => (
              <CheckoutProduct
                id={items.id}
                title={items.title}
                price={items.price}
                rating={items.rating}
                image={items.image}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <h1>Payment Method</h1>
          <div className="payment__method">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={subBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
