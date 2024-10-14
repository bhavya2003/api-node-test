// const cartService=require("../services/cart.service.js")
// const Address = require("../models/address.model.js");
// const Order = require("../models/order.model.js");
// const orderItems=require("../models/orderItems.model.js")


// async function createOrder(user,shippingAddress) {

//     let address;

//     if (shippingAddress._id){
//         let existAddress=await Address.findById(shippingAddress._id);
//         address=existAddress;

//     }

//     else{
//         address = new Address(shippingAddress);
//         address.user=user;
//         await address.save();

//         user.addresses.push(address);
//         await user.save();
//     }

//     const cart = await cartService.findUserCart(user._id);
//     const orderItems=[];

//     for(const item of cart.cartItems){
//         const orderItem = new orderItems({
//             price:item.price,
//             product:item.product,
//             quantity:item.quantity,
//             size:item.size,
//             userId:item.userId,
//             discountedPrice:item.discountedPrice,

//         })

//         const createdOrderItem = await orderItem.save();
//         orderItems.push(createdOrderItem)
//     }

//     const createdOrder = new orderItems({
//         user,
//         orderItems,
//         totalPrice:cart.totalPrice,
//         totalDiscountedPrice:cart.totalDiscountedPrice,
//         discount:cart.discount,
//         totalItem:cart.totalItem,
//         shippingAddress:address,
//     })

//     const savedOrder = await createOrder.save();
//     return savedOrder;
    
// }

// async function placeOrder(orderId) {

//     const order = await findOrderById(orderId);

//     order.orderstatus="PLACED";
//     order.paymentDetails.status="COMPLETED";

//     return await order.save();
    
// }

// async function confirmedOrder(orderId) {

//     const order = await findOrderById(orderId);

//     order.orderstatus="CONFIRMED";

//     return await order.save();
// }

// async function shippedOrder(orderId) {

//     const order = await findOrderById(orderId);

//     order.orderstatus="SHIPPED";

//     return await order.save();

// }

// async function deliverOrder(orderId) {

//     const order = await findOrderById(orderId);

//     order.orderstatus="DELIVERED";

//     return await order.save();

// }

// async function cancelOrder(orderId) {

//     const order = await findOrderById(orderId);

//     order.orderstatus="CANCELLED";

//     return await order.save();
// }

// async function findOrderById(orderId) {

//     const order=await Order.findById(orderId)
//     .populate("user")
//     .populate({path:"orderItems",populate:{path:"product"}})
//     .populate("shippingAddress")

//     return order   
// }

// async function usersOrderHistory(userId) {

//     try{
//         const orders=await Order.find({user:userId,orderStatus:"PLACED"})
//         .populate({path:"orderItems",populate:{path:"product"}}).lean()
//         return orders;
//     }
//     catch(error){
//         throw new Error(error.message)
//     }  
// }

// async function getAllOrders(params) {

//     return await Order.find()
//     .populate({path:"orderItems",populate:{path:"product"}}).lean()
    
// }

// async function deleteOrder(orderId) {
//     const order = await findOrderById(orderId);
//     await Order.findByIdAndDelete(order._id);
// }


// module.exports={
//     createOrder,
//     placeOrder,
//     confirmedOrder,
//     shippedOrder,
//     deliverOrder,
//     cancelOrder,
//     findOrderById,
//     usersOrderHistory,
//     getAllOrders,
//     deleteOrder
// }

const mongoose = require('mongoose');
const cartService = require("../services/cart.service.js");
const Address = require("../models/address.model.js");
const Order = require("../models/order.model.js");
const OrderItems = require("../models/orderItems.model.js"); // Import OrderItems model

// async function createOrder(user, shippingAddress) {
//     let address;

//     if (!user) {
//         throw new Error("User object is not defined");
//     }

//     if (!user.addresses) {
//         user.addresses = [];
//     }

//     // Handle shipping address: check if it's existing or new
//     if (shippingAddress._id) {
//         let existAddress = await Address.findById(shippingAddress._id);
//         address = existAddress;
//     } else {
//         address = new Address(shippingAddress);
//         address.user = user;
//         await address.save();

//         user.addresses.push(address);
//         await user.save();
//     }

//     // Fetch the user's cart
//     const cart = await cartService.findUserCart(user._id);
//     const orderItems = [];

//     // Loop through the cart items and create order items
//     for (const item of cart.cartItems) {
//         const orderItem = new OrderItems({ // Proper instantiation of OrderItems
//             price: item.price,
//             product: item.product,
//             quantity: item.quantity,
//             size: item.size,
//             userId: item.userId,
//             discountedPrice: item.discountedPrice,
//         });

//         const createdOrderItem = await orderItem.save(); // Save each order item
//         orderItems.push(createdOrderItem); // Push the created order item into the array
//     }

//     // Create the final order with all the data
//     const createdOrder = new Order({
//         user,
//         orderItems,
//         totalPrice: cart.totalPrice,
//         totalDiscountedPrice: cart.totalDiscountedPrice,
//         discount: cart.discount,
//         totalItem: cart.totalItem,
//         shippingAddress: address,
//     });

//     // Save the created order
//     const savedOrder = await createdOrder.save();
//     return savedOrder;
// }

// async function createOrder(user, shippingAddress) {
//     let address;

//     if (!user) {
//         throw new Error("User object is not defined");
//     }

//     if (!user.addresses) {
//         user.addresses = [];
//     }

//     // Handle shipping address: check if it's existing or new
//     if (shippingAddress._id) {
//         let existAddress = await Address.findById(shippingAddress._id);
//         address = existAddress;
//     } else {
//         address = new Address(shippingAddress);
//         address.user = user;
//         await address.save();

//         user.addresses.push(address);
//         await user.save();
//     }

//     // Fetch the user's cart
//     const cart = await cartService.findUserCart(user._id);
//     const orderItems = [];

//     // Loop through the cart items and create order items
//     for (const item of cart.cartItems) {
//         if (!item.product || !item.product._id) {
//             throw new Error("Product ID is missing for one of the items in the cart.");
//         }

//         // Create OrderItem with the product ID, not the whole product object
//         const orderItem = new OrderItems({
//             price: item.price,
//             product: item.product._id, // Use product ID
//             quantity: item.quantity,
//             size: item.size,
//             userId: user._id, // Ensure userId is passed correctly
//             discountedPrice: item.discountedPrice,
//         });

//         const createdOrderItem = await orderItem.save(); // Save each order item
//         orderItems.push(createdOrderItem); // Push the created order item into the array
//     }

//     // Create the final order with all the data
//     const createdOrder = new Order({
//         user,
//         orderItems,
//         totalPrice: cart.totalPrice,
//         totalDiscountedPrice: cart.totalDiscountedPrice,
//         discount: cart.discount,
//         totalItem: cart.totalItem,
//         shippingAddress: address,
//     });

//     // Save the created order
//     const savedOrder = await createdOrder.save();
//     return savedOrder;
// }

async function createOrder(userId, cartItems) {
    try {
        // Assuming you have an Order model
        const order = new Order({
            user: userId,
            items: cartItems.map(item => ({
                product: item.product.id,  // Using product ID
                quantity: item.quantity,
                size: item.size,
                price: item.price,
                discountedPrice: item.discountedPrice
            })),
            totalPrice: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
            // Additional fields can go here
        });

        const savedOrder = await order.save();
        return savedOrder;  // Return the saved order
    } catch (error) {
        console.error('Error creating order:', error);
        throw new Error('Failed to create order');
    }
}





// function generateCustomOrderId(userId) {
//     const timestamp = Date.now(); // Current timestamp in milliseconds
//     const randomString = Math.random().toString(36).substr(2, 6); // Random alphanumeric string
//     const shortUserId = userId.toString().slice(-4); // Last 4 characters of the user ID
//     return `ORD-${shortUserId}-${timestamp}-${randomString}`; // Custom format for orderId
// }

// async function createOrder(user, shippingAddress) {
//     let address;

//     if (!user) {
//         throw new Error("User object is not defined");
//     }

//     if (!user.addresses) {
//         user.addresses = [];
//     }

//     // Handle shipping address: check if it's existing or new
//     if (shippingAddress._id) {
//         let existAddress = await Address.findById(shippingAddress._id);
//         address = existAddress;
//     } else {
//         address = new Address(shippingAddress);
//         address.user = user;
//         await address.save();

//         user.addresses.push(address);
//         await user.save();
//     }

//     // Fetch the user's cart
//     const cart = await cartService.findUserCart(user._id);
//     const orderItems = [];

//     // Loop through the cart items and create order items
//     for (const item of cart.cartItems) {
//         const orderItem = new OrderItems({
//             price: item.price,
//             product: item.product,
//             quantity: item.quantity,
//             size: item.size,
//             userId: item.userId,
//             discountedPrice: item.discountedPrice,
//         });

//         const createdOrderItem = await orderItem.save();
//         orderItems.push(createdOrderItem); // Push the created order item into the array
//     }

//     // Generate a custom orderId
//     const orderId = generateCustomOrderId(user._id); // Generate a unique orderId

//     // Create the final order with all the data
//     const createdOrder = new Order({
//         orderId, // Assign the generated custom orderId
//         user,
//         orderItems,
//         totalPrice: cart.totalPrice,
//         totalDiscountedPrice: cart.totalDiscountedPrice,
//         discount: cart.discount,
//         totalItem: cart.totalItem,
//         shippingAddress: address,
//     });

//     // Save the created order
//     const savedOrder = await createdOrder.save();
//     return savedOrder;
// }





// async function placeOrder(orderId) {
//     const order = await findOrderById(orderId);

//     order.orderstatus = "PLACED";
//     order.paymentDetails.status = "COMPLETED";

//     return await order.save();
// }

async function placeOrder(userId) {
    try {
        const cart = await findUserCart(userId); // Get user's cart
        if (!cart || !cart.cartItems.length) {
            throw new Error("Cart is empty");
        }
        
        const order = await createOrder(userId, cart.cartItems);
        return order;  // Return the created order
    } catch (error) {
        console.error('Error placing order:', error);
        throw new Error('Failed to place order');
    }
}



async function confirmedOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderstatus = "CONFIRMED";

    return await order.save();
}

async function shippedOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderstatus = "SHIPPED";

    return await order.save();
}

async function deliverOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderstatus = "DELIVERED";

    return await order.save();
}

async function cancelOrder(orderId) {
    const order = await findOrderById(orderId);

    order.orderstatus = "CANCELLED";

    return await order.save();
}

// async function findOrderById(orderId) {
//     console.log('Fetching order with ID:', orderId);
 
//  try{
//     const order = await Order.findById(orderId)
//         .populate("user")
//         .populate({ path: "orderItems", populate: { path: "product" } })
//         .populate("shippingAddress");

//         if (!order) {
//             console.log('Order not found'); // Log if order is not found
//         } else {
//             console.log('Order found:', order); // Log the found order
//         }

//     return order;
// }catch (error) {
//     console.error('Error in findOrderById:', error.message); // Log errors
//     throw error;
// }
// }

async function findOrderById(orderId) {
    try {
        console.log('Fetching order with ID:', orderId);

        if (!mongoose.Types.ObjectId.isValid(orderId)) {
            console.log('Invalid orderId format:', orderId);
            return null;
        } else{
            console.log("valid object id")
        }

        const order = await Order.findById(orderId)
            .populate('user')
            .populate({ path: 'orderItems', populate: { path: 'product' } })
            .populate('shippingAddress');

        // const order = await Order.findById(orderId);
        //  console.log('Order without populate:', order);


        if (!order) {
            console.log('Order not found for ID:', orderId);
        } else {
            console.log('Order found:', order);
        }

        return order;
    } catch (error) {
        console.error('Error in findOrderById:', error.message);
        throw error;
    }
}



async function usersOrderHistory(userId) {
    try {
        const orders = await Order.find({ user: userId, orderStatus: "PLACED" })
            .populate({ path: "orderItems", populate: { path: "product" } }).lean();
        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllOrders(params) {
    return await Order.find()
        .populate({ path: "orderItems", populate: { path: "product" } }).lean();
}
  
async function deleteOrder(orderId) {
    const order = await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
}

module.exports = {
    createOrder,
    placeOrder,
    confirmedOrder,
    shippedOrder,
    deliverOrder,
    cancelOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrder
};
 