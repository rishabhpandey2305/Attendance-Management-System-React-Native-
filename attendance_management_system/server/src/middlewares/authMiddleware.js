// const jwt = require("jsonwebtoken");
// const asyncHandler = require("express-async-handler");

// const authorize = (role, User) =>
//     asyncHandler(async (req, res, next) => {
//         let token;

//         // Extract the JWT token from the request headers or query parameters
//         token = req.headers.authorization;

//         if (token) {
//             try {
//                 // Verify and decode the JWT token
//                 const decoded = jwt.verify(token, process.env.TOKEN_KEY);

//                 // Fetch user information based on the decoded user ID using the provided User model (Sequelize)
//                 const user = await User.findByPk(decoded.id);
//                 if (!user) {
//                     res.status(401);
//                     throw new Error("Not authorized, user not found");
//                 }

//                 // Check user's role for role-based access control
//                 if (user.role === role) {
//                     // Attach the user object to the request
//                     req.user = user;
//                     next();
//                 } else {
//                     res
//                         .status(403)
//                         .json({ error: "Not authorized, insufficient privileges" });
//                 }
//             } catch (error) {
//                 res.status(401);
//                 throw new Error("Not authorized, token failed");
//             }
//         } else {
//             res.status(401);
//             throw new Error("Not authorized, no token");
//         }
//     });

// module.exports = {
//     CitizenOnly: authorize("user", require("../models/user")), // Assuming your Sequelize User model is named 'User'
// };
