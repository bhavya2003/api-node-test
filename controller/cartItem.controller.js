// const CartItemService=require("../services/cartItem.service.js");


// const updateCartItem=async(req,res)=>{
//     const user=req.user
//     try{
//       const updatedCartItem=await CartItemService.updateCartItem(user._id,req.params.id,req.body);
//       return res.status(200).send(updatedCartItem);

//     }
//     catch(error){
//         return res.status(500).send({error:error.message})

//     }

// }

// const removeCartItem=async(req,res)=>{
//     const user=await req.user
//     try{
//       await CartItemService.removeCartItem(user._id,req.params.id);
//       return res.status(200).send({message:"cart item has been removed succesfully"});

//     }
//     catch(error){
//         return res.status(500).send({error:error.message})

//     }

// }

// module.exports={
//     updateCartItem,
//     removeCartItem
// }

const cartItemService = require("../services/cartItem.service.js");

// Update Cart Item
async function updateCartItem(req, res) {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user after authentication
        const cartItemId = req.params.cartItemId;
        const cartItemData = req.body;

        const updatedItem = await cartItemService.updateCartItem(userId, cartItemId, cartItemData);
        return res.status(200).json(updatedItem);
    } catch (error) {
        console.error('Error updating cart item:', error);
        return res.status(500).json({ message: error.message });
    }
}

// Remove Cart Item
async function removeCartItem(req, res) {
    try {
        const userId = req.user.id; // Assuming user ID is available in req.user after authentication
        const cartItemId = req.params.cartItemId;

        const response = await cartItemService.removeCartItem(userId, cartItemId);
        return res.status(200).json(response);
    } catch (error) {
        console.error('Error removing cart item:', error);
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    updateCartItem,
    removeCartItem
};
