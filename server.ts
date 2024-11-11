import express from "express";
import connectDB from "./config/db"; // Adjust path if necessary
import authRoutes from "./routes/auth"; // Import your auth routes

import dotenv from "dotenv";
dotenv.config();

const app = express();
connectDB();

const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000", // Allow only your frontend origin
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Enable cookies if needed for sessions
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth", authRoutes); // This registers the route

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
