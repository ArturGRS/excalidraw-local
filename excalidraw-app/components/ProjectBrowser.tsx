import React, { useState, useEffect } from "react";

import { serializeAsJSON } from "@excalidraw/excalidraw";
import { CaptureUpdateAction } from "@excalidraw/excalidraw";

import type { ExcalidrawImperativeAPI } from "@excalidraw/excalidraw/types";

interface ProjectBrowserProps {
  excalidrawAPI: ExcalidrawImperativeAPI | null;
}

interface Project {
  name: string;
  updatedAt: string;
}

export const ProjectBrowser: React.FC<ProjectBrowserProps> = ({
  excalidrawAPI,
}) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const API_BASE = "http://localhost:5000/api/projects";

  const fetchProjects = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) {
        throw new Error("Failed to fetch projects");
      }
      const data = await res.json();
      setProjects(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const loadProject = async (filename: string) => {
    if (!excalidrawAPI) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${filename}`);
      if (!res.ok) {
        throw new Error("Failed to load project");
      }
      const data = await res.json();
      if (data.files) {
        excalidrawAPI.addFiles(Object.values(data.files));
      }
      excalidrawAPI.updateScene({
        elements: data.elements,
        appState: data.appState,
        captureUpdate: CaptureUpdateAction.IMMEDIATELY,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProject = async () => {
    if (!excalidrawAPI) {
      return;
    }
    const name = newProjectName.trim() || `project-${Date.now()}.excalidraw`;

    // Ensure extension
    const filename = name.endsWith(".excalidraw") ? name : `${name}.excalidraw`;

    setIsLoading(true);
    try {
      const elements = excalidrawAPI.getSceneElements();
      const appState = excalidrawAPI.getAppState();
      const files = excalidrawAPI.getFiles();

      const json = serializeAsJSON(elements, appState, files, "local");
      const payload = JSON.parse(json);

      const res = await fetch(`${API_BASE}/${filename}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save project");
      }

      setNewProjectName("");
      fetchProjects(); // Refresh list
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (filename: string) => {
    if (!confirm(`Are you sure you want to delete ${filename}?`)) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE}/${filename}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete project");
      }
      fetchProjects();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="project-browser"
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        height: "100%",
        fontFamily: "var(--ui-font)",
        color: "var(--text-primary-color)",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.2rem" }}>
          My Projects
        </h3>
        <p
          style={{
            fontSize: "0.8rem",
            color: "var(--text-secondary-color)",
            margin: 0,
          }}
        >
          Manage your server-side projects
        </p>
      </div>

      {error && (
        <div
          style={{
            color: "var(--color-danger)",
            fontSize: "0.8rem",
            background: "var(--color-danger-bg)",
            padding: "0.5rem",
            borderRadius: "var(--border-radius-lg)",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <input
            type="text"
            placeholder="Project Name"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            style={{
              flex: 1,
              padding: "0.75rem",
              borderRadius: "var(--border-radius-lg)",
              border: "1px solid var(--button-gray-2)",
              background: "var(--input-bg-color)",
              color: "var(--text-primary-color)",
              fontSize: "0.9rem",
            }}
            onKeyDown={(e) => e.key === "Enter" && saveProject()}
          />
        </div>
        <button
          onClick={saveProject}
          disabled={isLoading || !excalidrawAPI}
          className="dropdown-menu-item"
          style={{
            padding: "0.75rem",
            borderRadius: "var(--border-radius-lg)",
            background: "var(--color-primary)",
            color: "var(--color-primary-text)",
            border: "none",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "0.9rem",
            width: "100%",
            opacity: isLoading ? 0.7 : 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isLoading ? "Saving..." : "Save Current"}
        </button>
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          marginTop: "0.5rem",
          minHeight: 0,
        }}
      >
        {isLoading && projects.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              color: "var(--text-secondary-color)",
            }}
          >
            Loading projects...
          </div>
        ) : projects.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "2rem",
              color: "var(--text-secondary-color)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "2rem" }}>📂</div>
            <div>
              No projects found.
              <br />
              Save your first project above!
            </div>
          </div>
        ) : (
          projects.map((p) => (
            <div
              key={p.name}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.75rem 1rem",
                borderRadius: "var(--border-radius-md)",
                cursor: "pointer",
                transition: "background 0.2s",
                // Simulate hover effect manually or rely on className if we had CSS
                backgroundColor: "var(--button-gray-1)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--button-gray-2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--button-gray-1)")
              }
            >
              <div
                onClick={() => loadProject(p.name)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  flex: 1,
                }}
              >
                <span
                  style={{
                    fontWeight: 500,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  title={p.name}
                >
                  {p.name.replace(".excalidraw", "")}
                </span>
                <span
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--text-secondary-color)",
                  }}
                >
                  {new Date(p.updatedAt).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteProject(p.name);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--icon-fill-color)",
                  opacity: 0.6,
                  padding: "0.5rem",
                }}
                title="Delete"
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "1";
                  e.currentTarget.style.color = "var(--color-danger)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "0.6";
                  e.currentTarget.style.color = "var(--icon-fill-color)";
                }}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
