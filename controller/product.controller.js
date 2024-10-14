// // const productService=require("../services/product.service.js");

// // const createProduct=async(req,res)=>{
// //     try{
// //         const product=await productService.createProduct(req.body);
// //         return res.status(201).send(product);
// //     }
// //     catch(error){
// //         return res.status(500).send({error:error.message});

// //     }
// // }

// // const deleteProduct=async(req,res)=>{

// //     const productId=req.params.id;

// //     try{

// //         const product=await productService.deleteProduct(productId);
// //         return res.status(200).send(product);
// //     }
// //     catch(error){
// //         return res.status(500).send({error:error.message});

// //     }
// // }

// // const updateProduct=async(req,res)=>{

// //     const productId=req.params.id;

// //     try{
// //         const product=await productService.updateProduct(productId,req.body);
// //         return res.status(201).send(product);
// //     }
// //     catch(error){
// //         return res.status(500).send({error:error.message});

// //     }
// // }

// // const findProductById=async(req,res)=>{

// //     const productId=req.params.id;

// //     try{
// //         const product=await productService.findProductById(productId);
// //         return res.status(201).send(product);
// //     }
// //     catch(error){
// //         return res.status(500).send({error:error.message});

// //     }
// // }

// // const getAllProducts=async(req,res)=>{

// //     const productId=req.params.id;

// //     try{
// //         const product=await productService.getAllProducts(req.query);
// //         return res.status(201).send(product);
// //     }
// //     catch(error){
// //         console.error("Error occurred in getAllProducts:", error);
// //         return res.status(500).send({error:error.message});

// //     }
// // }

// // const createMultipleProduct=async(req,res)=>{

// //     const productId=req.params.id;

// //     try{
// //         const product=await productService.createMultipleProduct(req.body);
// //         return res.status(201).send({message:"Products have been created successfully"});
// //     }
// //     catch(error){
// //         return res.status(500).send({error:error.message});

// //     }
// // }

// // module.exports={
// //     createProduct,
// //     deleteProduct,
// //     updateProduct,
// //     findProductById,
// //     getAllProducts,
// //     createMultipleProduct
// // }


// const Product = require("../models/product.model.js") // Adjust the path as necessary
// const productService = require("../services/product.service.js");

// // Create Product
// // const createProduct = async (req, res) => { 
// //     try {
// //         const product = await productService.createProduct(req.body);
// //         return res.status(201).send(product);
// //     } catch (error) {
// //         return res.status(500).send({ error: error.message });
// //     }
// // };

// const createProduct = async (req, res) => {
//     try {
//       // Create a new product instance
//       const product = new Product({
//         title: req.body.title,
//         brand: req.body.brand,
//         color: req.body.color,
//         imageUrl: req.body.imageUrl,
//         category: `${req.body.topCategory}/${req.body.secondCategory}/${req.body.thirdCategory}`, // Adjust this as necessary
//         description: req.body.description,
//         price: req.body.price,
//         discountedPrice: req.body.discountedPrice,
//         discountedPercent: req.body.discountedPercent,
//         size: req.body.size,
//         quantity: req.body.quantity,
//       });
  
//       // Save the product to the database
//       const savedProduct = await product.save();
//       res.status(201).json({ message: 'Product added successfully', product: savedProduct });
//     } 
//     catch (error) {
//         console.error('Error adding product:', error);
//         if (error.name === 'ValidationError') {
//           return res.status(400).json({ message: 'Validation failed', details: error.errors });
//         }
//         res.status(500).json({ message: 'Could not add product', error: error.message });
//       }
//   };
  

// // Delete Product
// const deleteProduct = async (req, res) => {
//     const productId = req.params.id;

//     try {
//         const product = await productService.deleteProduct(productId);
//         return res.status(200).send(product);
//     } catch (error) {
//         return res.status(500).send({ error: error.message });
//     }
// };

// // Update Product
// const updateProduct = async (req, res) => {
//     const productId = req.params.id;

//     try {
//         const product = await productService.updateProduct(productId, req.body);
//         return res.status(200).send(product); // Use 200 for successful updates
//     } catch (error) {
//         return res.status(500).send({ error: error.message });
//     }
// };

// // Find Product by ID
// const findProductById = async (req, res) => {
//     const productId = req.params.id;

//     try {
//         const product = await productService.findProductById(productId);
//         return res.status(200).send(product); // Use 200 for successful fetch
//     } catch (error) {
//         return res.status(500).send({ error: error.message });
//     }
// };

// // Get All Products with Query Parameters
// const getAllProducts = async (req, res) => {
//     try {
//         const products = await productService.getAllProducts(req.query);
//         return res.status(200).send(products); // Use 200 for successful fetch
//     } catch (error) {
//         console.error("Error occurred in getAllProducts:", error);
//         return res.status(500).send({ error: error.message });
//     }
// };

// // Create Multiple Products
// // const createMultipleProduct = async (req, res) => {
// //     try {
// //         await productService.createMultipleProducts(req.body);
// //         return res.status(201).send({ message: "Products have been created successfully" });
// //     } catch (error) {
// //         return res.status(500).send({ error: error.message });
// //     }
// // };


// // const getAllProducts = async (req, res) => {
// //     try {
// //         const products = await productService.getAllProducts(req.query); // req.query will include page, limit, etc.
// //         return res.status(200).json(products);  // Send a successful response with products
// //     } catch (error) {
// //         console.error("Error occurred in getAllProducts:", error);
// //         return res.status(500).json({ error: error.message });
// //     }
// // };




// // In your products controller
// async function createMultipleProduct(req, res) {
//     try {
//         // Check if products array exists in the request body
//         const { products } = req.body;

//         if (!Array.isArray(products) || products.length === 0) {
//             return res.status(400).json({ message: "Invalid products array." });
//         }

//         // Create products using the Product model
//         const createdProducts = await Product.insertMany(products);

//         return res.status(201).json(createdProducts);
//     } catch (error) {
//         console.error("Error creating multiple products:", error);
//         return res.status(500).json({ message: "Internal Server Error", error: error.message });
//     }
// }


// module.exports = {
//     createProduct,
//     deleteProduct,
//     updateProduct,
//     findProductById,
//     getAllProducts,
//     createMultipleProduct,
// };



const Product = require("../models/product.model.js");
const productService = require("../services/product.service.js");

// Create Product
const createProduct = async (req, res) => {
    try {
        // Validate request body
        if (!req.body.title || !req.body.brand) {
            return res.status(400).json({ message: 'Title and Brand are required.' });
        }

        const product = new Product({
            title: req.body.title,
            brand: req.body.brand,
            color: req.body.color,
            imageUrl: req.body.imageUrl,
            category: `${req.body.topCategory}/${req.body.secondCategory}/${req.body.thirdCategory}`,
            description: req.body.description,
            price: req.body.price,
            discountedPrice: req.body.discountedPrice,
            discountedPercent: req.body.discountedPercent,
            size: req.body.size,
            quantity: req.body.quantity,
        });

        // Save the product to the database
        const savedProduct = await product.save();
        return res.status(201).json({ message: 'Product added successfully', product: savedProduct });
    } catch (error) {
        console.error('Error adding product:', error);
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: 'Validation failed', details: error.errors });
        }
        return res.status(500).json({ message: 'Could not add product', error: error.message });
    }
};

// Create Multiple Products
const createMultipleProduct = async (req, res) => {
    try {
        const { products } = req.body;

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Invalid products array." });
        }

        const createdProducts = await Product.insertMany(products);
        return res.status(201).json(createdProducts);
    } catch (error) {
        console.error("Error creating multiple products:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await productService.deleteProduct(productId);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        return res.status(200).send({ message: 'Product deleted successfully', product });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await productService.updateProduct(productId, req.body);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        return res.status(200).send({ message: 'Product updated successfully', product });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

// Find Product by ID
// const findProductById = async (req, res) => {
//     const productId = req.params.id;

//     try {
//         const product = await productService.findProductById(productId);
//         if (!product) {
//             return res.status(404).send({ message: 'Product not found' });
//         }
//         return res.status(200).send(product);
//     } catch (error) {
//         return res.status(500).send({ error: error.message });
//     }
// };

const findProductById = async (req, res) => {
    const productId = parseInt(req.params.id, 10); // Parse the ID to an integer

    try {
        const product = await productService.findProductById(productId); // Pass the numeric ID
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


// Get All Products with Query Parameters
const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts(req.query);
        return res.status(200).send(products);
    } catch (error) {
        console.error("Error occurred in getAllProducts:", error);
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    findProductById,
    getAllProducts,
    createMultipleProduct,
};
