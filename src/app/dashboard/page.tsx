"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Project = {
  id: string;
  name: string;
};

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [loadingProjects, setLoadingProjects] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoadingProjects(true);
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      } else {
        console.error("Failed to fetch projects:", res.status, res.statusText);
      }
      setLoadingProjects(false);
    };

    if (status === "authenticated") {
      fetchProjects();
    }
  }, [status]);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newProjectName }),
    });

    if (res.ok) {
      const newProject = await res.json();
      setProjects((prevProjects) => [...prevProjects, newProject]);
      setNewProjectName("");
    }
  };

  if (status === "loading" || status === "unauthenticated") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Your Dashboard</h1>
      <p className="mt-2">
        Welcome, {session?.user?.name || session?.user?.email}!
      </p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Create New Project</h2>
        <form onSubmit={handleCreateProject} className="mt-4 flex gap-2">
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="My Awesome Project"
            className="border p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create
          </button>
        </form>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Your Projects</h2>
        {loadingProjects ? (
          <p className="mt-4 text-gray-500">Loading projects...</p>
        ) : (
          <>
            {projects.length > 0 ? (
              <ul className="mt-4 space-y-2">
                {projects.map((project) => (
                  <li key={project.id} className="border p-4 rounded-md">
                    <Link href={`/projects/${project.id}`} className="block">
                      {project.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-gray-500">
                {`You haven't created any projects yet.`}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
