"use client";

import { useState, useEffect } from "react";

type Endpoint = {
  id: string;
  method: string;
  path: string;
  jsonBody: string;
};

type Project = {
  id: string;
  name: string;
  endpoints: Endpoint[];
};

export default function ProjectDetailClient({
  projectId,
}: {
  projectId: string;
}) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const [method, setMethod] = useState("GET");
  const [path, setPath] = useState("");
  const [jsonBody, setJsonBody] = useState("");

  useEffect(() => {
    const fetchProjectDetails = async () => {
      const res = await fetch("/api/projects", { credentials: "include" });
      if (res.ok) {
        const projects = await res.json();
        const currentProject = projects.find(
          (p: Project) => p.id === projectId
        );
        setProject(currentProject || null);
      }
      setLoading(false);
    };
    fetchProjectDetails();
  }, [projectId]);

  const handleCreateEndpoint = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/projects/${projectId}/endpoints`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ method, path, jsonBody }),
      credentials: "include",
    });

    if (res.ok) {
      const updatedProjectRes = await fetch("/api/projects", {
        credentials: "include",
      });
      if (updatedProjectRes.ok) {
        const projects = await updatedProjectRes.json();
        const currentProject = projects.find(
          (p: Project) => p.id === projectId
        );
        setProject(currentProject || null);
        setMethod("GET");
        setPath("");
        setJsonBody("");
      }
    } else {
      console.error("Failed to create endpoint");
    }
  };

  if (loading) return <div>Loading project...</div>;
  if (!project) return <div>Project not found.</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold">Project: {project.name}</h1>
      <p className="text-sm text-gray-500 mt-1">Project ID: {project.id}</p>

      <div className="mt-8 p-6 border rounded-md">
        <h2 className="text-2xl font-semibold">Create New Endpoint</h2>
        <form onSubmit={handleCreateEndpoint} className="mt-4 space-y-4">
          <div>
            <label className="block font-medium">HTTP Method</label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full border p-2 rounded mt-1"
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Path</label>
            <input
              type="text"
              value={path}
              onChange={(e) => setPath(e.target.value)}
              placeholder="/users"
              className="w-full border p-2 rounded mt-1"
              required
            />
          </div>
          <div>
            <label className="block font-medium">JSON Body</label>
            <textarea
              value={jsonBody}
              onChange={(e) => setJsonBody(e.target.value)}
              placeholder='[{"id": 1, "name": "John Doe"}]'
              className="w-full border p-2 rounded mt-1 font-mono"
              rows={6}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create Endpoint
          </button>
        </form>
      </div>
    </div>
  );
}
