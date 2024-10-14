// // const Cart = require("../models/cart.model.js");
// // const CartItem = require("../models/cartItem.model.js");
// // const Product = require("../models/product.model.js");

// // // Create Cart if not exists
// // async function createCart(userId) {
// //     try {
// //         const cart = new Cart({ user: userId });
// //         return await cart.save();
// //     } catch (error) {
// //         throw new Error(error.message);
// //     }
// // }

// // async function findUserCart(userId) {
// //     try {
// //         let cart = await Cart.findOne({ user: userId }).populate('cartItems');
// //         console.log('Cart after finding:', cart); // Log cart after fetching

// //         if (!cart) {
// //             cart = await createCart(userId); // Create cart if not exists
// //             console.log('Created new cart:', cart);
// //         } else {
// //             const cartItems = await CartItem.find({ cart: cart._id }).populate("product");
// //             console.log('Cart items fetched:', cartItems);
// //             cart.cartItems = cartItems;
// //         }

// //         let totalPrice = 0, totalDiscountedPrice = 0, totalItem = 0;
// //         for (let cartItem of cart.cartItems) {
// //             totalPrice += cartItem.price * cartItem.quantity;
// //             totalDiscountedPrice += cartItem.discountedPrice * cartItem.quantity || 0; // Ensure no undefined value
// //             totalItem += cartItem.quantity;
// //         }

// //         cart.totalPrice = totalPrice;
// //         cart.totalItem = totalItem;
// //         cart.discount = totalPrice - totalDiscountedPrice;

// //         return cart;
// //     } catch (error) {
// //         console.error('Error in findUserCart:', error); // Log any error
// //         throw new Error(error.message);
// //     }
// // }


// // // Add Cart Item
// // async function addCartItem(userId, req) {
// //     try {
// //         let cart = await Cart.findOne({ user: userId });
// //         if (!cart) {
// //             cart = await createCart(userId); // Create cart if not exists
// //         }

// //         const product = await Product.findById(req.productId);
// //         if (!product) {
// //             throw new Error("Product not found");
// //         }

// //         const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id });
// //         if (!isPresent) {
// //             const cartItem = new CartItem({
// //                 product: product._id,
// //                 cart: cart._id,
// //                 quantity: 1,
// //                 userId,
// //                 price: product.price,
// //                 discountedPrice: product.discountedPrice,
// //                 size: req.size
// //             });

// //             const createdCartItem = await cartItem.save();
// //             cart.cartItems.push(createdCartItem);
// //             await cart.save();
// //             return "Item added to cart";
// //         }
// //     } catch (error) {
// //         throw new Error(error.message);
// //     }
// // }

// // module.exports = {
// //     createCart,
// //     findUserCart,
// //     addCartItem
// // };


// const Cart = require("../models/cart.model.js");
// const CartItem = require("../models/cartItem.model.js");
// const Product = require("../models/product.model.js");

// // Create Cart if not exists
// async function createCart(userId) {
//     try {
//         const cart = new Cart({ user: userId });
//         return await cart.save();
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// async function findUserCart(userId) {
//     try {
//         let cart = await Cart.findOne({ user: userId }).populate('cartItems');
//         console.log('Cart after finding:', cart); // Log cart after fetching

//         if (!cart) {
//             cart = await createCart(userId); // Create cart if not exists
//             console.log('Created new cart:', cart);
//         } else {
//             const cartItems = await CartItem.find({ cart: cart._id }).populate("product");
//             console.log('Cart items fetched:', cartItems);
//             cart.cartItems = cartItems;
//         }

//         let totalPrice = 0, totalDiscountedPrice = 0, totalItem = 0;
//         for (let cartItem of cart.cartItems) {
//             totalPrice += cartItem.price * cartItem.quantity;
//             totalDiscountedPrice += cartItem.discountedPrice * cartItem.quantity || 0; // Ensure no undefined value
//             totalItem += cartItem.quantity;
//         }

//         cart.totalPrice = totalPrice;
//         cart.totalItem = totalItem;
//         cart.discount = totalPrice - totalDiscountedPrice;

//         return cart;
//     } catch (error) {
//         console.error('Error in findUserCart:', error); // Log any error
//         throw new Error(error.message);
//     }
// }

// // Add Cart Item
// async function addCartItem(userId, req) {
//     try {
//         let cart = await Cart.findOne({ user: userId });
//         if (!cart) {
//             cart = await createCart(userId); // Create cart if not exists
//         }

//         const product = await Product.findById(req.productId); // Ensure req.productId is numeric
//         if (!product) {
//             throw new Error("Product not found");
//         }

//         const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id });
//         if (!isPresent) {
//             const cartItem = new CartItem({
//                 product: product._id,
//                 cart: cart._id,
//                 quantity: 1,
//                 userId: userId, // Include userId here
//                 price: product.price,
//                 discountedPrice: product.discountedPrice,
//                 size: req.size
//             });

//             const createdCartItem = await cartItem.save();
//             cart.cartItems.push(createdCartItem._id); // Use createdCartItem._id to push the reference
//             await cart.save();
//             return "Item added to cart";
//         } else {
//             // If the item is already present, you might want to update the quantity or return a message
//             return "Item already in cart";
//         }
//     } catch (error) {
//         throw new Error(error.message);
//     }
// }

// module.exports = {
//     createCart,
//     findUserCart,
//     addCartItem
// };


const Cart = require("../models/cart.model.js");
const CartItem = require("../models/cartItem.model.js");
const Product = require("../models/product.model.js");

// Create Cart if not exists
async function createCart(userId) {
  try {
    const cart = new Cart({ user: userId });
    return await cart.save();
  } catch (error) {
    throw new Error(error.message);
  }
}

async function findUserCart(userId) {
  try {
    let cart = await Cart.findOne({ user: userId }).populate('cartItems');

    if (!cart) {
      cart = await createCart(userId);
    } else {
      const cartItems = await CartItem.find({ cart: cart._id }).populate("product");
      cart.cartItems = cartItems;
    }

    let totalPrice = 0, totalDiscountedPrice = 0, totalItem = 0;
    for (let cartItem of cart.cartItems) {
      totalPrice += cartItem.price * cartItem.quantity;
      totalDiscountedPrice += cartItem.discountedPrice * cartItem.quantity || 0;
      totalItem += cartItem.quantity;
    }

    cart.totalPrice = totalPrice;
    cart.totalItem = totalItem;
    cart.discount = totalPrice - totalDiscountedPrice;

    return cart;
  } catch (error) {
    console.error('Error in findUserCart:', error);
    throw new Error(error.message);
  }
}

// Add Cart Item
async function addCartItem(userId, req) {
  try {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      cart = await createCart(userId);
    }

    const product = await Product.findById(req.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const existingCartItem = await CartItem.findOne({
      cart: cart._id,
      product: product._id,
      size: req.size
    });

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      await existingCartItem.save();
      return { message: "Item quantity updated" };
    } else {
      const cartItem = new CartItem({
        product: product._id,
        cart: cart._id,
        quantity: 1,
        userId: userId, // Include userId here
        price: product.price,
        discountedPrice: product.discountedPrice,
        size: req.size
      });

      const createdCartItem = await cartItem.save();
      cart.cartItems.push(createdCartItem._id);
      await cart.save();
      return { message: "Item added to cart" };
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = {
  createCart,
  findUserCart,
  addCartItem
};