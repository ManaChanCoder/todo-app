import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// components
import connectionDB from "./config/connectionDB.js";
import todosRoute from "./routes/todosRoute.js";

const app = express();
dotenv.config()

// middleware
app.use(express.json());
const allowedOrigins = [
 "https://todo-app-rose-omega.vercel.app",
  "http://localhost:1500", // optional: local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// handle preflight requests (OPTIONS)
app.options("*", cors());


// API Routes
app.use("/api/todos", todosRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectionDB();
  console.log(`running at port: ${port}`);
});
