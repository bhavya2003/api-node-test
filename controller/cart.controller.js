// const cartService=require("../services/cart.service.js");
// const mongoose = require('mongoose');

// const findUserCart=async(req,res)=>{
//     const user=req.user;
//     try{

//         const cart=await cartService.findUserCart(user._id);
//         return res.status(200).send(cart);

//     }
//     catch(error){
//         return res.status(500).json({error:error.message})

//     }
// }

// const addItemToCart=async(req,res)=>{
//     const user=req.user;
//     try{

//         const cartItem=await cartService.addCartItem(user._id,req.body)
//         return res.status(200).json(cartItem);

//     }
//     catch(error){
//         return res.status(500).send({error:error.message})

//     }
// }





// module.exports={
//     findUserCart,
//     addItemToCart
// }

const cartService = require("../services/cart.service.js");

// Get User Cart
async function getUserCart(req, res) {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user after authentication
        const cart = await cartService.findUserCart(userId);
        return res.status(200).json(cart);
    } catch (error) {
        console.error('Error fetching user cart:', error);
        return res.status(500).json({ message: error.message });
    }
}

// Add Item to Cart
async function addItemToCart(req, res) {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user after authentication
        const response = await cartService.addCartItem(userId, req.body);
        return res.status(201).json({ message: response });
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUserCart,
    addItemToCart
};
