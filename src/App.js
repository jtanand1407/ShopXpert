import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import LoginPage from "./LoginPage";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
  "pk_test_51LcYwZSDcyUrHUfAiIikVo7NMGKtpEmCg7vEft1FmLOwgBwRZDbs5a24pFPe1g5aEHxUbnd9VZv2qPb0sFLpESxI00qvk56amk"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log("Username is >>>", authUser);
      if (authUser) {
        dispatch({
          type: "SET__USER",
          user: authUser,
        });
      } else {
        dispatch({
          type: "SET__USER",
          user: null,
        });
      }
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/checkout"
            element={
              <>
                <Header /> <Checkout />
              </>
            }
          ></Route>
          <Route
            path="/orders"
            element={
              <>
                <Header />
                <Orders />
              </>
            }
          ></Route>
          <Route
            path="/payment"
            element={
              <>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </>
            }
          ></Route>
          <Route
            path="/"
            element={
              <>
                <Header /> <Home />
              </>
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
