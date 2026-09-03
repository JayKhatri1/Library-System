import jwt from "jsonwebtoken";


const verifyToken = (req, res, next) => {
    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "Authorization token is required!"
            });
        }


        if (!authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Invalid authorization format!"
            });
        }


        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token is missing!"
            });
        }


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        req.user = decoded;

        next();

    } catch (error) {

        console.error("AUTH ERROR:", error);

        return res.status(401).json({
            message: "Invalid or expired token!"
        });
    }
};


const isAdmin = (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({
            message: "Unauthorized!"
        });
    }


    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Admin access required!"
        });
    }


    next();
};


export {
    verifyToken,
    isAdmin
};