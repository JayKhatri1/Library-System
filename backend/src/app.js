import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

const app = express();
app.use(helmet());

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        message:
            "Too many requests. Please try again later."
    }
});

app.use(
    "/api/v1/users/login",
    authLimiter
);

app.use(
    "/api/v1/users/register",
    authLimiter
);

app.use(cors({
    origin: [
        "http://localhost:5173",

        // Stable production domain
        "https://library-system-three-sigma.vercel.app",

        // Vercel deployment/preview URLs
        /^https:\/\/library-system-[a-z0-9]+-jaykhatri1\.vercel\.app$/
    ],
    credentials: true,

    allowedHeaders: [
        "Content-Type",
        "Authorization"
    ],
    methods: [
        "GET",
        "POST",
        "PUT",
        "DELETE",
        "OPTIONS"
    ]
}));

app.use(express.json({
    limit: "10kb"
}));

// import routes :

import userRouter from './routes/user.route.js';
import categoryRouter from "./routes/category.route.js";
import bookRouter from "./routes/book.route.js";
import transactionRouter from "./routes/transaction.route.js";
import adminRouter from "./routes/admin.route.js";

// Home routes:

app.get("/", (req, res) => {
    res.send("Library Management System API is running");
});

app.get("/api/v1/test", (req, res) => {
    res.json({
        message: "Backend connected successfully!"
    });
});

// declare routes:

app.use("/api/v1/users", userRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/books", bookRouter);
app.use("/api/v1/transactions", transactionRouter);
app.use("/api/v1/admin", adminRouter);


// Example user route :

// http://localhost:5000/api/v1/users/register

// Example category route :

// http://localhost:5000/api/v1/categories/addcategory

// Example book route :

// http://localhost:5000/api/v1/books/addbook

// Example borrowbook route :

// http://localhost:5000/api/v1/transactions/borrow



export default app;