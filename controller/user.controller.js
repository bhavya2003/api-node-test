// const userService = require("../services/user.service.js")

// const getUserProfile = async(req,res)=>{
//     try{
//         const jwt = req.headers.authorization?.split(" ")[1];


//         if(!jwt){
//             return res.status(401).send({error:"Token not Provided"})
           
//         }
//         const user = await userService.getUserProfileByToken(jwt)
//         return res.status(200).send(user);
//     }
//     catch(error){ 

//         return res.status(500).send({error:error.message})

//     }
// }

// const getAllUsers=async(req,res)=>{
//     try{
//         const users = await userService.getAllUsers();
//         return res.status(200).send(users)
//     }
//     catch(error){
//         return res.status(500).send({error:error.message})
//     }

    // const deleteUsers=async(req,res)=>{
    //     try {
    //         const userId = req.params.id;  // Get userId from request params
        
            // Find and delete user by ID
//             const user = await user.findByIdAndDelete(userId);
        
//             if (!user) {
//               return res.status(404).json({ message: 'User not found' });
//             }
        
//             res.status(200).json({ message: 'User deleted successfully' });
//           } catch (error) {
//             res.status(500).json({ message: 'Server error', error: error.message });
//           }

//     }
// }

// module.exports={getUserProfile,getAllUsers,deleteUsers}

// // const userService = require("../services/user.service");

// // const getUserProfile = async (req, res) => {
// //     try {
// //         const jwt = req.headers.authorization?.split(" ")[1];

// //         if (!jwt) {
// //             return res.status(401).send({ error: "Token not Provided" });
// //         }

// //         const user = await userService.getUserProfileByToken(jwt);
// //         return res.status(200).send(user);
// //     } catch (error) {
// //         return res.status(500).send({ error: error.message });
// //     }
// // };

// // const getAllUsers = async (req, res) => {
// //     try {
// //         const users = await userService.getAllUsers();
// //         return res.status(200).send(users);
// //     } catch (error) {
// //         return res.status(500).send({ error: error.message });
// //     }
// // };

// // const deleteUser = async (req, res) => {
//     try {
//         const userId = req.params.id; // Get userId from request params

        // Call service to delete user
//         const deletedUser = await userService.deleteUserById(userId);

//         if (!deletedUser) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         return res.status(200).json({ message: "User deleted successfully" });
//     } catch (error) {
//         return res.status(500).json({ message: "Server error", error: error.message });
//     }
// };

// const logout = async (req, res) => {
//     const userId = req.userId; // Get the user ID from the request
//     try {
//         const user = await userService.getUserById(userId); // Fetch user by ID

//         if (!user) {
//             return res.status(404).send({ message: "User not found" });
//         }

//         user.isActive = false; // Set user status to inactive
//         await user.save(); // Save the user status

//         return res.status(200).send({ message: "Logout successful" });
//     } catch (error) {
//         return res.status(500).send({ error: error.message });
//     }
// };



// module.exports = {
//     getUserProfile,
//     getAllUsers,
//     deleteUser,
//     logout
// };

const userService = require("../services/user.service");

const getUserProfile = async (req, res) => {
    try {
        const jwt = req.headers.authorization?.split(" ")[1];

        if (!jwt) {
            return res.status(401).send({ error: "Token not Provided" });
        }

        const user = await userService.getUserProfileByToken(jwt);
        console.log("User profile fetched:", user); // Log user profile fetched
        return res.status(200).send(user);
    } catch (error) {
        console.error("Error fetching user profile:", error.message); // Log the error
        return res.status(500).send({ error: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        console.log("All users fetched:", users); // Log all users fetched
        return res.status(200).send(users);
    } catch (error) {
        console.error("Error fetching users:", error.message); // Log the error
        return res.status(500).send({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id; // Get userId from request params

        // Call service to delete user
        const deletedUser = await userService.deleteUserById(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log("User deleted successfully:", deletedUser); // Log deleted user info
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error.message); // Log the error
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// const logout = async (req, res) => {
//     const userId = req.userId; // Get the user ID from the request
//     try {
//         const user = await userService.getUserById(userId); // Fetch user by ID

//         if (!user) {
//             return res.status(404).send({ message: "User not found" });
//         }

//         user.isActive = false; // Set user status to inactive
//         await user.save(); // Save the user status

//         console.log("User logged out and status set to inactive:", userId); // Log successful logout
//         return res.status(200).send({ message: "Logout successful" });
//     } catch (error) {
//         console.error("Error during logout:", error.message); // Log the error
//         return res.status(500).send({ error: error.message });
//     }
const logout = async (req, res) => {
    const userEmail = req.body.email; // Get the email from the request body
    try {
        const user = await userService.getUserByEmail(userEmail); // Fetch user by email

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        user.isActive = false; // Set user status to inactive
        await user.save(); // Save the user status

        console.log("User logged out and status set to inactive:", userEmail); // Log successful logout
        return res.status(200).send({ message: "Logout successful" });
    } catch (error) {
        console.error("Error during logout:", error.message); // Log the error
        return res.status(500).send({ error: error.message });
    }
};

;



module.exports = {
    getUserProfile,
    getAllUsers,
    deleteUser,
    logout
};
