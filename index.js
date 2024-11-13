import "dotenv/config";

import { connection } from "./db/connection.js";
import express from "express";
import authMiddleware from "./middlewares/auth.middleware.js";
import cors from "cors";
import authRouter from "./routes/auth.routes.js";
import bookmarkRouter from "./routes/bookmark.routes.js";

// constants

const app = express();
const PORT = parseInt(process.env.PORT, 10) || 5000;

// middlewares and routes
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://bookmark-frontend-q6u2.vercel.app",
      "http://localhost:5173",
    ],
  })
);
app.use("/auth", authRouter);

app.use("/bookmarks", authMiddleware, bookmarkRouter);

// Server
app.listen(PORT, async () => {
  console.log("Server started");
  await connection;
  console.log("DB connection done");
});
