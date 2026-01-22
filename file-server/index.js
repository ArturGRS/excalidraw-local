/* eslint-disable no-console */
const path = require("path");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs-extra");

const app = express();
const PORT = process.env.PORT || 5000;
const PROJECTS_DIR = path.join(__dirname, "../projects");

// Ensure projects directory exists
fs.ensureDirSync(PROJECTS_DIR);

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" })); // Large limit for canvas data
app.use(express.static(path.join(__dirname, "../excalidraw-app/build")));

// API: List all projects
app.get("/api/projects", async (req, res) => {
  try {
    const files = await fs.readdir(PROJECTS_DIR);
    const projects = await Promise.all(
      files
        .filter((f) => f.endsWith(".excalidraw") || f.endsWith(".json"))
        .map(async (file) => {
          const stats = await fs.stat(path.join(PROJECTS_DIR, file));
          return {
            name: file,
            updatedAt: stats.mtime,
          };
        }),
    );
    res.json(projects.sort((a, b) => b.updatedAt - a.updatedAt));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to list projects" });
  }
});

// API: Get a project content
app.get("/api/projects/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    // Basic security check to prevent directory traversal
    if (filename.includes("..") || filename.includes("/")) {
      return res.status(400).json({ error: "Invalid filename" });
    }

    const filePath = path.join(PROJECTS_DIR, filename);
    if (!(await fs.pathExists(filePath))) {
      return res.status(404).json({ error: "Project not found" });
    }

    const content = await fs.readJson(filePath);
    res.json(content);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to read project" });
  }
});

// API: Save a project
app.post("/api/projects/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    if (filename.includes("..") || filename.includes("/")) {
      return res.status(400).json({ error: "Invalid filename" });
    }

    const filePath = path.join(PROJECTS_DIR, filename);
    await fs.writeJson(filePath, req.body, { spaces: 2 });

    res.json({ success: true, filename });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save project" });
  }
});

// API: Delete a project
app.delete("/api/projects/:filename", async (req, res) => {
  try {
    const filename = req.params.filename;
    if (filename.includes("..") || filename.includes("/")) {
      return res.status(400).json({ error: "Invalid filename" });
    }

    const filePath = path.join(PROJECTS_DIR, filename);
    await fs.remove(filePath);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete project" });
  }
});

// Serve frontend for any other route (SPA support)
app.get("*", (req, res) => {
  const indexPath = path.join(__dirname, "../excalidraw-app/build/index.html");
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send("Excalidraw build not found. Please run build command.");
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Projects directory: ${PROJECTS_DIR}`);
});
