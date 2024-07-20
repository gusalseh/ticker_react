import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { UserContext } from "../../userContext";
import { Project, Ticket } from "../Board";

interface ProjectDetailProps {
  projects: Project[];
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projects }) => {
  const { projectId } = useParams<{ projectId: string }>();
  const project = projects.find((p) => p.id === Number(projectId));
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }

  const { name, team } = userContext;

  // 이미 id가 포함된 완전한 Ticket 객체를 받음
  // const createTicket = (ticket: Ticket) => {

  // 새로운 id(새로운 티켓)가 생성되는 상황에서 유용
  const createTicket = (ticket: Omit<Ticket, "id">) => {
    const newTicket: Ticket = {
      id: Date.now(),
      title: ticket.title,
      description: ticket.description,
      requester: name,
      team: team,
      status: ticket.status,
      priority: ticket.priority,
    };
  };

  if (!project) {
    // return <p>프로젝트를 찾을 수 없습니다.</p>;
    return <Navigate to="/nomatch" replace />;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      {/* 추가로 프로젝트에 대한 정보를 표시할 수 있습니다. */}
      <p>{name}</p>
      <p>{team}</p>
    </div>
  );
};

export default ProjectDetail;
