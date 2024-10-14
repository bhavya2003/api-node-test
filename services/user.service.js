// const User = require("../models/user.model");
// const bcrypt=require("bcrypt");
// const jwtProvider=require("../config/jwtProvider")

// const createUser=async(userData)=>{
//     try{
//         let {firstName,lastName,email,password}=userData;

//         const isUserExist=await User.findOne({email});

//         if(isUserExist){
//             throw new Error("User already exists with this email:",email)
//         }

//         password = await bcrypt.hash(password,8);

//         const user=await User.create({firstName,lastName,email,password});
//         console.log("New user created", user)
//         return user;
//     }
//     catch(error)
//     {
//         throw new Error(error.message)
//     }
// }

// const findUserById=async(userId)=>{
//     try{
//         const user=await User.findById(userId).populate(address);

//         if(!user){
//             throw new error("User not found with id : ", userId)
//         }
//         return user;

//     }
//     catch(Error){
//            throw new Error(error.message)
//     }
// }

// const getUserByEmail=async(email)=>{
//     try{
//         const user=await User.findOne(email);

//         if(!user){
//             throw new error("User not found with email : ", email)
//         }
//         return user;

//     }
//     catch(Error){
//            throw new Error(error.message)
//     }
// }


// const getUserProfileByToken=async(token)=>{
//     try{

//         const userId=jwtProvider.getUserIdFromToken(token);
//         const user=await findUserById(userId)

//         if(!user){
//             throw new Error("User not found with Id : ", userId)
//         }
//         return user;
       
//     }
//     catch(error){
//         throw new Error(error.message)

//     }
// }

// const getAllUsers=async()=>{

//     try{
//         const users=await User.find();
//         return users;
//     }
//     catch(error){
//         throw new Error(error.message)
//     }
// }

// module.exports={
//     createUser,
//     findUserById,
//     getUserByEmail,
//     getUserProfileByToken,
//     getAllUsers
// };

// const User = require("../models/user.model");
// const bcrypt = require("bcrypt");
// const jwtProvider = require("../config/jwtProvider");

// const createUser = async (userData) => {
//     try {
//         let { firstName, lastName, email, password } = userData;

//         console.log("Password before hashing:", password);
//         console.log("Type of password:", typeof password);

//         const isUserExist = await User.findOne({ email });

//         if (isUserExist) {
//             throw new Error(`User already exists with this email: ${email}`);
//         }

//         if (typeof password !== 'string') {
//             throw new Error('Password is not a string');
//         }

//         password = await bcrypt.hash(password, 8);

//         const user = await User.create({ firstName, lastName, email, password });
//         console.log("New user created", user);
//         return user;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// const findUserById = async (userId) => {
//     try {
//         const user = await User.findById(userId)
//         // .populate('address');

//         if (!user) {
//             throw new Error(`User not found with id: ${userId}`);
//         }
//         return user;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// const getUserByEmail = async (email) => {
//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             throw new Error(`User not found with email: ${email}`);
//         }
//         return user;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// const getUserProfileByToken = async (token) => {
//     try {
//         const userId = jwtProvider.getUserIdFromToken(token);
//         const user = await findUserById(userId);

//         if (!user) {
//             throw new Error(`User not found with Id: ${userId}`);
//         }
//         return user;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// const getAllUsers = async () => {
//     try {
//         const users = await User.find();
//         return users;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };

// module.exports = {
//     createUser,
//     findUserById,
//     getUserByEmail,
//     getUserProfileByToken,
//     getAllUsers
// };


const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwtProvider = require("../config/jwtProvider");

const createUser = async (userData) => {
    try {
        let { firstName, lastName, email, password } = userData;

        console.log("Password before hashing:", password);
        console.log("Type of password:", typeof password);

        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            throw new Error(`User already exists with this email: ${email}`);
        }

        if (typeof password !== 'string') {
            throw new Error('Password is not a string');
        }

        password = await bcrypt.hash(password, 8);

        const user = await User.create({ firstName, lastName, email, password });
        console.log("New user created", user);
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// const findUserById = async (userId) => {
//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             throw new Error(`User not found with id: ${userId}`);
//         }
//         return user;
//     } catch (error) {
//         throw new Error(error.message);
//     }
// };



const findUserById = async (userId) => {
    try {
        const user = await User.findById(userId); // Use Mongoose to find the user by ID
        if (!user) {
            throw new Error(`User not found with id: ${userId}`); // Throw error if not found
        }
        return user; // Return found user
    } catch (error) {
        throw new Error(error.message); // Catch and throw any other errors
    }
};



const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error(`User not found with email: ${email}`);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getUserProfileByToken = async (token) => {
    try {
        const userId = jwtProvider.getUserIdFromToken(token);
        const user = await findUserById(userId);
        if (!user) {
            throw new Error(`User not found with Id: ${userId}`);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

const getAllUsers = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

const deleteUserById = async (userId) => {
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            throw new Error(`User not found with id: ${userId}`);
        }
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    createUser,
    findUserById,
    getUserByEmail,
    getUserProfileByToken,
    getAllUsers,
    deleteUserById
};

