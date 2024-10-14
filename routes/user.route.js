const express = require("express")
const router = express.Router();
const userController = require("../controller/user.controller.js")
const jwtProvider = require("../config/jwtProvider.js")


router.get("/",userController.getUserProfile);
router.get("/users",userController.getAllUsers);
router.delete('/users/:id', userController.deleteUser);
router.post("/logout", jwtProvider.verifyToken, userController.logout);

module.exports=router;