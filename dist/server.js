"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var db_1 = __importDefault(require("./config/db")); // Adjust path if necessary
var auth_1 = __importDefault(require("./routes/auth")); // Import your auth routes
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
(0, db_1.default)();
var cors = require("cors");
var corsOptions = {
    origin: "http://localhost:3000", // Allow only your frontend origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable cookies if needed for sessions
    optionsSuccessStatus: 200, // For legacy browser support
};
app.use(cors(corsOptions));
app.use(express_1.default.json());
app.use("/api/auth", auth_1.default); // This registers the route
var PORT = process.env.PORT || 5001;
app.listen(PORT, function () {
    console.log("Server is running on port ".concat(PORT));
});
