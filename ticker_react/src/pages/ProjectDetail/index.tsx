import React from "react";
import { useParams } from "react-router-dom";
import { Project } from "../Board";

interface ProjectDetailProps {
  projects: Project[];
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projects }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === Number(projectId));

  if (!project) {
    return <p>프로젝트를 찾을 수 없습니다.</p>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      {/* 추가로 프로젝트에 대한 정보를 표시할 수 있습니다. */}
    </div>
  );
};

export default ProjectDetail;
