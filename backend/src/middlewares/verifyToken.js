import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  jwt.verify(token, "key", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });

    req.user = decoded; 
    next();
  });
};
