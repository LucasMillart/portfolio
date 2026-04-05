const mongoose = require("mongoose");

const Project = require("../models/Project");
const Backlog = require("../models/Backlog");

async function seed()
{
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/portfolio";

  await mongoose.connect(uri);

  await Backlog.deleteMany({});
  await Project.deleteMany({});

  const projects = await Project.insertMany([
    {
      name: "Planifeo",
      description:
        "Application mobile de planification d'entrainement et suivi de performance pour athletes.",
      imageUrl: "https://picsum.photos/seed/planifeo/1200/700",
      technologies: ["React Native", "TypeScript", "Node.js", "MongoDB"],
      status: "in-progress",
      github: "https://github.com/example/planifeo",
    },
    {
      name: "NexuStream",
      description:
        "Plateforme SaaS de gestion de contenu video en temps reel pour createurs.",
      imageUrl: "https://picsum.photos/seed/nexustream/1200/700",
      technologies: ["Next.js", "TypeScript", "Express", "MongoDB"],
      status: "planning",
    },
    {
      name: "EchoVault",
      description:
        "Interface web securisee pour la gestion de mots de passe et documents confidentiels.",
      imageUrl: "https://picsum.photos/seed/echovault/1200/700",
      technologies: ["Next.js", "Node.js", "JWT", "MongoDB"],
      status: "completed",
      liveUrl: "https://example.com/echovault",
    },
  ]);

  await Backlog.insertMany([
    {
      projectId: projects[0]._id,
      items: [
        {
          title: "Auth mobile",
          description: "Mise en place du login JWT et refresh token.",
          status: "in-progress",
          changes: [
            { change: "Creation du flow d'authentification", timestamp: new Date() },
            { change: "Ajout du refresh token", timestamp: new Date() },
          ],
        },
        {
          title: "Dashboard performance",
          description: "Graphiques de progression hebdomadaire.",
          status: "todo",
          changes: [{ change: "Specification des KPI", timestamp: new Date() }],
        },
      ],
    },
    {
      projectId: projects[1]._id,
      items: [
        {
          title: "Architecture multi-tenant",
          description: "Conception de la separation des donnees clients.",
          status: "todo",
          changes: [{ change: "Redaction des scenarios", timestamp: new Date() }],
        },
      ],
    },
    {
      projectId: projects[2]._id,
      items: [
        {
          title: "Audit securite",
          description: "Verification OWASP des routes sensibles.",
          status: "done",
          changes: [{ change: "Audit termine", timestamp: new Date() }],
        },
      ],
    },
  ]);

  console.log("Seed termine: projets et backlogs de test inseres.");
  await mongoose.disconnect();
}

seed().catch(async (error) =>
{
  console.error("Erreur seed:", error);
  await mongoose.disconnect();
  process.exit(1);
});
