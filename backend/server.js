import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import projectRoutes from "./routes/projects.js";
import backlogRoutes from "./routes/backlogs.js";

const app = express();

// Middleware
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI)
{
  throw new Error("MONGODB_URI environment variable is not set");
}
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

app.use("/api/projects", projectRoutes);
app.use("/api/backlogs", backlogRoutes);

// Health check
app.get("/api/health", (req, res) =>
{
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
{
  console.log(`🚀 Server running on port ${PORT}`);
});
