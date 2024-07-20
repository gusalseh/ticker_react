import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { Button } from "../../components";
import { UserContext } from "../../userContext";
import { Project, Ticket } from "../Board";
import TicketModal from "../Ticket/TicketModal";

interface ProjectDetailProps {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({
  projects,
  setProjects,
}) => {
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
    setProjects((prevProject) =>
      prevProject.map((p) =>
        p.id === Number(projectId)
          ? { ...p, tickets: [...p.tickets, newTicket] }
          : p
      )
    );
  };

  if (!project) {
    // return <p>프로젝트를 찾을 수 없습니다.</p>;
    return <Navigate to="/nomatch" replace />;
  }

  // return (
  //   <div>
  //     <h1>{project.name}</h1>
  //     <p>{project.description}</p>
  //     {/* 추가로 프로젝트에 대한 정보를 표시할 수 있습니다. */}
  //     <p>{name}</p>
  //     <p>{team}</p>
  //   </div>
  // );

  return (
    <div>
      <h1 className="text-2xl font-bold">{project.name}</h1>
      <p className="mb-4">{project.description}</p>
      <Button onClick={openModal} optionalStyle="py-2 px-4 mb-4">
        새 티켓 생성하기
      </Button>
      <TicketModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateTicket={createTicket}
      />
      <div>
        <h2 className="text-xl font-bold mb-2">티켓 목록</h2>
        {project.tickets.map((ticket) => (
          <div key={ticket.id} className="border p-2 mb-2">
            <h3 className="font-bold">{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>우선순위: {ticket.priority}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetail;
