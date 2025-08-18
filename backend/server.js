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
app.use(
  cors({
    origin: ["https://todo-app-rose-omega.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


// API Routes
app.use("/api/todos", todosRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectionDB();
  console.log(`running at port: ${port}`);
});
