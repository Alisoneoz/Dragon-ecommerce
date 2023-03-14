const express = require("express");
const dotenv= require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser")
dotenv.config()
const stripe = require("./routes/stripe")
const app = express();

app.use("/api/checkout/webhook", bodyParser.raw({ type: "*/*" }))
//CORS
app.use(cors())

//Read json body functionality with expressJS Middleware
app.use(express.json());

//routes
app.get("/", (req, res)=>{ res.send("hello World")})

  //Stripe payments route
app.use("/api/stripe", stripe)

//Listen for request
const PORT = process.env.PORT || 7005
 app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))
