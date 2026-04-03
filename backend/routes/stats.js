const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Backlog = require("../models/Backlog");

// GET global statistics
router.get("/", async (req, res) =>
{
  try
  {
    const projects = await Project.find();
    const backlogs = await Backlog.find();

    // Calculate stats
    const totalProjects = projects.length;
    const totalBacklogItems = backlogs.reduce(
      (sum, b) => sum + b.items.length,
      0
    );
    const completedProjects = projects.filter(
      (p) => p.status === "completed"
    ).length;
    const inProgressProjects = projects.filter(
      (p) => p.status === "in-progress"
    ).length;

    const stats = {
      totalProjects,
      completedProjects,
      inProgressProjects,
      totalBacklogItems,
      projectsByStatus: {
        planning: projects.filter((p) => p.status === "planning").length,
        inProgress: inProgressProjects,
        completed: completedProjects,
        onHold: projects.filter((p) => p.status === "on-hold").length,
      },
      projectsByTech: {},
    };

    // Count projects by technology
    projects.forEach((p) =>
    {
      p.technologies.forEach((tech) =>
      {
        stats.projectsByTech[tech] =
          (stats.projectsByTech[tech] || 0) + 1;
      });
    });

    res.json(stats);
  } catch (error)
  {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
