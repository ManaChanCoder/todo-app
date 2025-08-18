import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// components
import connectionDB from "./config/connectionDB.js";
import todosRoute from "./routes/todosRoute.js";

const app = express();
dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.development",
});

// middleware
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: true, credentials: true }));
} else if (process.env.NODE_ENV === "production") {
  const allowOrigin = ["https://todo-app-rose-omega.vercel.app", "http://localhost:3000"];

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin || allowOrigin.includes(origin)) {
          callback(null, true);
        } else {
          console.warn(`CORS Blocked: ${origin}`);
          callback(new Error("Not allowed by cors"));
        }
      },
      credentials: true,
    })
  );
}

// API Routes
app.use("/api/todos", todosRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  connectionDB();
  console.log(`running at port: ${port}`);
});
