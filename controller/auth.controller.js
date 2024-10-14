// const userService=require("../services/user.service.js")
// const jwtProvider=require("../config/jwtProvider.js")
// const bcrypt=require("bcrypt")
// const cartService= require("../services/cart.service.js")

// const register = async(req,res)=>{

//     try{
//       const user= await userService.createUser(req.body);
//       const jwt= jwtProvider.generateToken(user._id);

//     await cartService.createCart(user);

//       return res.status(200).send({jwt,message:"Registration Successfull"})
//     }
//     catch(error){

//         return res.status(500).send({error:error.message});

//     }

// }

// const login = async(req,res)=>{
//     const {password,email}=req.body
//     try{
//       const user = await userService.getUserByEmail(email);

//       if(!user){
//         return res.status(404).send({message : "User not found with email : ", email})
//       }
//       const isPasswordValid = await bcrypt.compare(password,user.password);
        
//       if(!isPasswordValid){
//         return res.status(401).send({message:"Invalid Password"})
//       }

//       const jwt = jwtProvider.generateToken(user._id);
//       return res.status(200).send({jwt,message:"Login successfull"});

//     }
//     catch(error){
//         return res.status(500).send({error:error.message});
//     }
// }

// module.exports={register,login}

// const userService = require("../services/user.service.js");
// const jwtProvider = require("../config/jwtProvider.js");
// const bcrypt = require("bcrypt");
// const cartService = require("../services/cart.service.js");

// const register = async (req, res) => {
//     try {
//         const user = await userService.createUser(req.body);
//         const jwt = jwtProvider.generateToken(user._id);

//         await cartService.createCart(user);

//         return res.status(200).send({ jwt, message: "Registration Successful" });
//     } catch (error) {
//         return res.status(500).send({ error: error.message });
//     }
// };

// const login = async (req, res) => {
//     const { password, email } = req.body;
//     try {
//         const user = await userService.getUserByEmail(email);

//         if (!user) {
//             return res.status(404).send({ message: `User not found with email: ${email}` });
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);

//         if (!isPasswordValid) {
//             return res.status(401).send({ message: "Invalid Password" });
//         }

//         user.isActive = true;
//         await user.save();
//         const jwt = jwtProvider.generateToken(user._id);
//         return res.status(200).send({ jwt, message: "Login Successful" });
//     } catch (error) {
//         return res.status(500).send({ error: error.message });
//     }
// };

// module.exports = { register, login };


const userService = require("../services/user.service.js");
const jwtProvider = require("../config/jwtProvider.js");
const bcrypt = require("bcrypt");
const cartService = require("../services/cart.service.js");

const register = async (req, res) => {
    try {
        const user = await userService.createUser(req.body);
        const jwt = jwtProvider.generateToken(user._id);

        await cartService.createCart(user);

        return res.status(200).send({ jwt, message: "Registration Successful" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

const login = async (req, res) => {
    const { password, email } = req.body;
    try {
        const user = await userService.getUserByEmail(email);

        // Check if user exists
        if (!user) {
            return res.status(404).send({ message: `User not found with email: ${email}` });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid Password" });
        }

        // Update user's active status
        console.log("User before activation:", user);
        user.isActive = true;

        
        // Save the updated user to the database
        await user.save(); 
        console.log("User after activation:", user);                  // Ensure this line is present to persist changes

        // Generate JWT
        const jwt = jwtProvider.generateToken(user._id);
        
        return res.status(200).send({ jwt, message: "Login Successful" });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};




module.exports = { register, login};  
