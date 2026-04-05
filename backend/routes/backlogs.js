import express from "express";
import Backlog from "../models/Backlog.js";

const router = express.Router();

// GET all backlogs for a project
router.get("/project/:projectId", async (req, res) =>
{
  try
  {
    const backlog = await Backlog.findOne({
      projectId: req.params.projectId,
    }).populate("projectId");
    res.json(backlog);
  } catch (error)
  {
    res.status(500).json({ error: error.message });
  }
});

// GET all backlogs (for global view)
router.get("/", async (req, res) =>
{
  try
  {
    const backlogs = await Backlog.find()
      .populate("projectId")
      .sort({ createdAt: -1 });
    res.json(backlogs);
  } catch (error)
  {
    res.status(500).json({ error: error.message });
  }
});

// CREATE backlog
router.post("/", async (req, res) =>
{
  try
  {
    const backlog = new Backlog(req.body);
    await backlog.save();
    await backlog.populate("projectId");
    res.status(201).json(backlog);
  } catch (error)
  {
    res.status(400).json({ error: error.message });
  }
});

// ADD item to backlog
router.post("/:backlogId/items", async (req, res) =>
{
  try
  {
    const backlog = await Backlog.findById(req.params.backlogId);
    if (!backlog)
    {
      return res.status(404).json({ error: "Backlog not found" });
    }
    backlog.items.push(req.body);
    await backlog.save();
    res.status(201).json(backlog);
  } catch (error)
  {
    res.status(400).json({ error: error.message });
  }
});

// UPDATE backlog item
router.put("/:backlogId/items/:itemId", async (req, res) =>
{
  try
  {
    const backlog = await Backlog.findById(req.params.backlogId);
    if (!backlog)
    {
      return res.status(404).json({ error: "Backlog not found" });
    }

    const item = backlog.items.id(req.params.itemId);
    if (!item)
    {
      return res.status(404).json({ error: "Item not found" });
    }

    Object.assign(item, req.body);
    await backlog.save();
    res.json(backlog);
  } catch (error)
  {
    res.status(400).json({ error: error.message });
  }
});

// DELETE backlog item
router.delete("/:backlogId/items/:itemId", async (req, res) =>
{
  try
  {
    const backlog = await Backlog.findById(req.params.backlogId);
    if (!backlog)
    {
      return res.status(404).json({ error: "Backlog not found" });
    }

    backlog.items.id(req.params.itemId).deleteOne();
    await backlog.save();
    res.json(backlog);
  } catch (error)
  {
    res.status(500).json({ error: error.message });
  }
});

export default router;
