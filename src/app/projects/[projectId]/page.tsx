import ProjectDetailClient from "@/components/projects/ProjectDetailClient";

export default async function ProjectDetailPage({
  params,
}: {
  params: { projectId: string };
}) {
  const resolvedParams = await params;

  const { projectId } = resolvedParams;

  return <ProjectDetailClient projectId={projectId} />;
}
