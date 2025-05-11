import express from "express";
import routes from "./routes"; // Import routes
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", routes);
app.get("/", (_req, res) => {
  res.send("Hello from Express + TypeScript on Lambda!");
});

export default app;
