const authMiddleware = (req, res, next) => {
    const { userid } = req.headers;
  
    if (!userid) {
      return res.status(401).json({ message: "Unauthorized: No user ID found" });
    }
  
    next();
  };
  
  module.exports = authMiddleware;