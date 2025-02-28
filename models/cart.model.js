const mongoose=require("mongoose");

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        required: true,
    },
    cartItems:[{  
        type: mongoose.Schema.Types.ObjectId,
        ref:"CartItem",
        required: true,
    }],
    totalPrice:{
        type:Number,
        required: true,
        default:0
    },
    totalItem:{
        type:Number,
        required:true,
        default:0
    },
    totalDiscountedPrice:{
        type:Number,
        required:true,
        default:0
    },
    discount:{
        type:Number,
        required:true,
        default:0
    },  
});

cartSchema.index({ user: 1 });
cartSchema.index({ "cartItems.productId": 1 });

const Cart =mongoose.model("Cart", cartSchema);
module.exports=Cart;

// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "users",
//     required: true,
//   },
//   cartItems: [
//     {
//       productId: {
//         type: Number, // Use numeric productId instead of ObjectId
//         required: true,
//       },
//       quantity: {
//         type: Number,
//         required: true,
//         default: 1,
//       },
//       price: {
//         type: Number,
//         required: true,
//       },
//       discountedPrice: {
//         type: Number,
//         required: true,
//       },
//       size: {
//         type: String,
//         required: true,
//       },
//     },
//   ],
//   totalPrice: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   totalItem: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   totalDiscountedPrice: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
//   discount: {
//     type: Number,
//     required: true,
//     default: 0,
//   },
// });

// cartSchema.index({ user: 1 });
// cartSchema.index({ "cartItems.productId": 1 });

// const Cart = mongoose.model("Cart", cartSchema);
// module.exports = Cart;
