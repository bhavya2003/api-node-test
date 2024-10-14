// // const userService=require("../services/user.service.js");
// // // const Cart=require("../models/cart.model.js");
// // const CartItem=require("../models/cartItem.model.js");

// // async function updateCartItem(userId, cartItemId,cartItemData) {
// //     try{
// //        const item=await findCartItemById(cartItemId);

// //        if(!item){
// //         throw new Error("cart item not found : ", cartItemId)
// //        }

// //        const user=await userService.findUserById(item.userId);
// //        if(!user){
// //         throw new Error("user not found : ", userId)
// //        }

// //        if(user._id.toString()===userId.toString()){
// //         item.quantity=cartItemData.quantity;
// //         item.price.quantity*item.product.price;
// //         item.discountedPrice=item.quantity*item.product.discountedPrice;

// //         if (!isNaN(item.quantity) && !isNaN(item.product.discountedPrice)) {
// //             item.discountedPrice = item.quantity * item.product.discountedPrice;
// //         } else {
// //             throw new Error("Invalid quantity or discounted price");
// //         }




// //         const updatedCartItem=await item.save();
// //         return updatedCartItem;

// //        }
// //        else{
// //         throw new Error("you can't update the cart item")
// //        }
// //     }
// //     catch(error){
// //         throw new Error(error.message)

// //     }
// // }
 
// // async function removeCartItem(userId,cartItemId) {
// //     const cartItem=await findCartItemById(cartItemId);
// //     const user=await userService.findUserById(userId);

// //     console.log(user._id.toString(), cartItem.userId.toString())

// //     if(user._id.toString()===cartItem.userId.toString()){
// //        return await CartItem.findByIdAndDelete(cartItemId);

// //     }
    
// //         throw new Error("You cannot remove another user's item")
// //     }

// //     async function findCartItemById(cartItemId) {
// //         const cartItem=await CartItem.findById(cartItemId).populate("product");
        
// //         if(cartItem){
// //             return cartItem
// //         }
// //         else{
// //             throw new Error("Cart item not found with id", cartItemId)
// //         }
        
// //     }
    

// // module.exports={
// //     updateCartItem,
// //     removeCartItem,
// //     findCartItemById
// // };


// const CartItem = require("../models/cartItem.model.js");
// const cartService = require("../services/cart.service.js");
// const userService = require("../services/user.service.js");

// // Update Cart Item
// async function updateCartItem(userId, cartItemId, cartItemData) {
//     try {
//         const item = await findCartItemById(cartItemId);
//         if (!item) {
//             throw new Error(`Cart item not found: ${cartItemId}`);
//         }

//         const user = await userService.findUserById(item.userId);
//         if (!user) {
//             throw new Error(`User not found: ${userId}`);
//         }

//         if (user._id.toString() === userId.toString()) {
//             item.quantity = cartItemData.quantity;
//             item.price = item.quantity * item.product.price;
//             item.discountedPrice = item.quantity * item.product.discountedPrice;

//             const updatedCartItem = await item.save();
//             return updatedCartItem;
//         } else {
//             throw new Error("You cannot update another user's cart item");
//         }
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// // Remove Cart Item
// async function removeCartItem(userId, cartItemId) {
//     try {
//         const cartItem = await findCartItemById(cartItemId);
//         const user = await userService.findUserById(userId);

//         if (user._id.toString() === cartItem.userId.toString()) {
//             await CartItem.findByIdAndDelete(cartItemId);
//             return { message: "Cart item has been removed successfully" };
//         } else {
//             throw new Error("You cannot remove another user's cart item");
//         }
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// // Find Cart Item by ID
// async function findCartItemById(cartItemId) {
//     const cartItem = await CartItem.findById(cartItemId).populate("product");
//     if (cartItem) {
//         return cartItem;
//     } else {
//         throw new Error(`Cart item not found with id: ${cartItemId}`);
//     }
// }

// module.exports = {
//     updateCartItem,
//     removeCartItem,
//     findCartItemById
// };


const CartItem = require("../models/cartItem.model.js");
const cartService = require("../services/cart.service.js");
const userService = require("../services/user.service.js");

// Update Cart Item
async function updateCartItem(userId, cartItemId, cartItemData) {
    try {
        const cartItem = await findCartItemById(cartItemId);
        if (!cartItem) {
            throw new Error(`Cart item not found: ${cartItemId}`);
        }

        const user = await userService.findUserById(cartItem.userId);
        if (!user) {
            throw new Error(`User not found: ${userId}`);
        }

        // Ensure the user can only update their own cart items
        if (user._id.toString() === userId.toString()) {
            cartItem.quantity = cartItemData.quantity;
            cartItem.price = cartItem.quantity * cartItem.product.price;
            cartItem.discountedPrice = cartItem.quantity * cartItem.product.discountedPrice;

            const updatedCartItem = await cartItem.save();
            return updatedCartItem;
        } else {
            throw new Error("You cannot update another user's cart item");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}


// async function removeCartItem(userId, cartItemId) {
//     console.log('Received userId:', userId);
//     console.log('Received cartItemId:', cartItemId); // Log cartItemId
//     try {
//         const cartItem = await findCartItemById(cartItemId);
//         const user = await userService.findUserById(userId);

//         // Ensure the user can only remove their own cart items
//         if (user._id.toString() === cartItem.userId.toString()) {
//             await CartItem.findByIdAndDelete(cartItemId);
//             return { message: "Cart item has been removed successfully" };
//         } else {
//             throw new Error("You cannot remove another user's cart item");
//         }
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }


// Remove Cart Item
async function removeCartItem(userId, cartItemId) {
    try {
        const cartItem = await findCartItemById(cartItemId);
        const user = await userService.findUserById(userId);

        // Ensure the user can only remove their own cart items
        if (user._id.toString() === cartItem.userId.toString()) {
            await CartItem.findByIdAndDelete(cartItemId);
            return { message: "Cart item has been removed successfully" };
        } else {
            throw new Error("You cannot remove another user's cart item");
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

// Find Cart Item by ID
async function findCartItemById(cartItemId) {
    const cartItem = await CartItem.findById(cartItemId).populate("product");
    if (cartItem) {
        return cartItem;
    } else {
        throw new Error(`Cart item not found with id: ${cartItemId}`);
    }
}

module.exports = {
    updateCartItem,
    removeCartItem,
    findCartItemById
};
