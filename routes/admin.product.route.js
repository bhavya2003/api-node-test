// const express = require("express")
// const router = express.Router();
// const productController=require("../controller/product.controller.js");
// const authenticate=require("../middleware/authenticate.js");


// router.post("/products",productController.createProduct);
// router.post("/creates",authenticate,productController.createMultipleProduct);
// router.delete("/:id",authenticate,productController.deleteProduct);
// router.put("/:id",authenticate,productController.updateProduct);

// module.exports=router;

const express = require("express");
const router = express.Router();
const productController = require("../controller/product.controller.js");
const authenticate = require("../middleware/authenticate.js");

// Routes for product operations
router.post("/products", productController.createProduct); // Create a single product
router.post("/bulk", authenticate, productController.createMultipleProduct); // Create multiple products
router.delete("/products/delete/:id", authenticate, productController.deleteProduct); // Delete a product by ID
router.put("/products/:id", authenticate, productController.updateProduct); // Update a product by ID

module.exports = router; 
