import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import projectRoutes from "./routes/projects.js";
import backlogRoutes from "./routes/backlogs.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio")
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
