// roleMiddleware.js
export const restrictTo = (...allowedRoles) => {
  return (req, res, next) => {
    // req.user should be set by protect middleware
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Insufficient role" });
    }

    next(); // role is allowed, proceed
  };
};
