const express=require("express")
const bodyParser = require('body-parser');


const cors=require("cors")

const app=express() 
   

app.use(cors({
    origin: "http://localhost:4200", 
  credentials: true
}))

app.use(bodyParser.json());
app.use(express.json())


app.get("/",(req,res)=>{
    return res.status(200).send({message: "Welcome to my store",status:true})
})


const authRouters=require("./routes/auth.route.js")
app.use("/auth",authRouters);


const userRouters=require("./routes/user.route.js");
app.use("/api/profile",userRouters);

const adminRouters=require("./routes/admin.route.js");
app.use("/api/admin/orders",adminRouters);

const adminProductRouters=require("./routes/admin.product.route.js");
app.use("/api/admin",adminProductRouters);

const productRouter=require("./routes/product.route.js");
app.use("/api/products",productRouter);

const cartRouter=require("./routes/cart.route.js");
app.use("/api/cart",cartRouter);

const cartItemRouter=require("./routes/cartItem.route.js");
app.use("/api/cart_items",cartItemRouter);

const orderRouter=require("./routes/order.route.js");
app.use("/api/orders",orderRouter);

const ratingRouter=require("./routes/rating.route.js");
app.use("/api/rating",ratingRouter);

const reviewRouter=require("./routes/review.route.js");
app.use("/api/review",reviewRouter);

const paymentRouter=require("./routes/payment.route.js");
app.use("/api/payment", (req, res, next) => {
    console.log("Payment route hit");
    next();
},paymentRouter);

// const paymentRouter=require("./routes/payment.route.js");
// app.use("/api/apyments",paymentRouter);




module.exports=app;