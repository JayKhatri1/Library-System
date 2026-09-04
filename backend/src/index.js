import dotenv from "dotenv"
dotenv.config({
    path: './.env'
});
import connectDB from "./config/database.js";
import app from "./app.js";


const startServer = async () => {
    try {
        
        await connectDB();

        app.on("error", (error) => {
            console.log("ERROR", error);
            throw error;
        });

        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on Port : ${process.env.PORT}`);
        }); 
    } catch (error) {
        console.log("MongoDB connection failed.",error);
    }
}

startServer();