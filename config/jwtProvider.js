// const jwt=require("jsonwebtoken");
// const SECRET_KEY="kdokfmkefejklsdmskdlkwoewdmmkvnkllaksdlmdokewkdnkmkdmic";

// const generateToken=(userId)=>{
//     const token=jwt.sign({userId}, SECRET_KEY, {expiresIn:"48h"})
//     return token;
// }

// const getUserIdFromToken=(token)=>{
//   const decodedToken=jwt.verify(token,SECRET_KEY)
//   return decodedToken.userId
// }

// const verifyToken = (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

//   if (!token) {
//       return res.status(403).send({ message: "Token is required!" });
//   }

//   try {
//       const decoded = jwt.verify(token, SECRET_KEY);
//       req.userId = decoded.userId; // Attach the user ID to the request object
//       next(); // Proceed to the next middleware/route handler
//   } catch (error) {
//     console.error("Token verification failed:", error.message);
//       return res.status(401).send({ message: "Unauthorized!" });
//   }
// };

// module.exports={generateToken,getUserIdFromToken,verifyToken}

const jwt = require("jsonwebtoken");
const SECRET_KEY = "kdokfmkefejklsdmskdlkwoewdmmkvnkllaksdlmdokewkdnkmkdmic"; // Set your secret key here

const generateToken = (userId) => {
    const token = jwt.sign({ userId }, SECRET_KEY, { expiresIn: "48h" });
    console.log("Token generated:", token); // Log the generated token
    return token;
};

const getUserIdFromToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        console.log("Decoded Token:", decodedToken); // Log the decoded token
        return decodedToken.userId;
    } catch (error) {
        console.error("Failed to decode token:", error.message); // Log any errors
        throw error; // Rethrow the error to be handled in the calling function
    }
};

const verifyToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        console.warn("No token provided"); // Log warning for missing token
        return res.status(403).send({ message: "Token is required!" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.userId = decoded.userId; // Attach the user ID to the request object
        console.log("Token verified for userId:", req.userId); // Log the verified user ID
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.error("Token verification failed:", error.message);
        return res.status(401).send({ message: "Unauthorized!" });
    }
};

module.exports = { generateToken, getUserIdFromToken, verifyToken };
