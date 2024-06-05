require("dotenv").config();
const jwt = require("jsonwebtoken");

// Adjust according to your Sequelize User model path and import it
const User = require("../models/user");

module.exports.createSecretToken = async (id) => {
    try {
        // Fetch user information from the database based on the user ID
        const user = await User.findByPk(id);
        if (!user) {
            throw new Error("User not found");
        }

        // Generate and return the JWT token
        return jwt.sign({ id: user.id }, process.env.TOKEN_KEY, {
            expiresIn: 3 * 24 * 60 * 60, // 3 days in seconds
        });
    } catch (error) {
        console.error("Error creating secret token:", error);
        throw error;
    }
};
