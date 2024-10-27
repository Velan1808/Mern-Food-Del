import jwt from "jsonwebtoken";
import "dotenv/config.js";

const authTokenMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization; 

  // Check if the Authorization header is provided and starts with 'Bearer'
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ success: false, message: "Not Authorized. Login Again" });
  }

  const token = authHeader.split(" ")[1]; // Extract the token from the "Bearer <token>" string

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id; // Attach the decoded user ID to the request body
    next(); // Continue to the next middleware/route handler
  } catch (err) {
    return res.status(403).json({ success: false, message: "Token verification failed" });
  }
};

export default authTokenMiddleware;
