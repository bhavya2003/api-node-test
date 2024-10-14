const express = require("express")
const router = express.Router();
const cartController=require("../controller/cart.controller.js");
const authenticate=require("../middleware/authenticate.js");
const { route } = require("./auth.route");


router.get("/",authenticate,cartController.getUserCart);
router.put("/add",authenticate,cartController.addItemToCart);

module.exports=router;