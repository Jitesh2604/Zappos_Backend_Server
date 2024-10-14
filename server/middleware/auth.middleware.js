const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.header("Authorization").replace("Bearer ", "").trim();
    if(!token) {
        return res.status(401).json({ message: "Authorization token is missing" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (err) {
        res.status(401).josn({ message: "Invalid  token" });
    }
};