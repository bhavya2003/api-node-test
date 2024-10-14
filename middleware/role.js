const jwtProvider = require('../config/jwtProvider'); // Adjust the path as necessary

const checkAdminRole = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Token not provided" });
    }

    try {
        const userRole = jwtProvider.getUserRoleFromToken(token); // Use the function to get role from token

        if (userRole !== 'admin') {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        next(); // Role is admin, proceed to the next middleware or route handler
    } catch (error) {
        console.error("Error in checkAdminRole middleware:", error.message);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { checkAdminRole };
