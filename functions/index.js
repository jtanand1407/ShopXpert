const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51LcYwZSDcyUrHUfAXAisT5KEVdLxptJxZtMr1EWTFfituOCpu2JJw2o609ICWg2NWWW17OUlo0ZJ3oXXJVUcZQWd00nWxzAKMz"
);

const app = express();
app.use(cors());
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));

app.post("/payment/create", async (request, response) => {
  const total = request.query.total;

  console.log("BOOM!! Money got posted>>>",total)

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

exports.api = functions.https.onRequest(app);
