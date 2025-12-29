import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// components
import connectionDB from "./config/connectionDB.js";
import todosRoute from "./routes/todosRoute.js";

const app = express();

// middleware
app.use(
  cors({
    origin: "*", // pwede muna lahat para sure (later limit mo sa Vercel domain lang)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// optional pero minsan kailangan sa Render
app.options("*", cors());
app.use(express.json());

// API Routes
app.use("/api/todos", todosRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectionDB();
  console.log(`running at port: ${port}`);
});
