import jwt from "jsonwebtoken";

// user authentication middleware
const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = token_decode.id;
    next();
  } catch (error) {
    console.log("JWT Error:", error.message);
    if (error.name === "JsonWebTokenError") {
      return res.json({
        success: false,
        message: "Invalid token. Please login again.",
      });
    } else if (error.name === "TokenExpiredError") {
      return res.json({
        success: false,
        message: "Token expired. Please login again.",
      });
    } else {
      return res.json({
        success: false,
        message: "Authentication failed. Please login again.",
      });
    }
  }
};

export default authUser;
