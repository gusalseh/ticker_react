import React, { useContext, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import {
  Button,
  PriorityBadge,
  StatusBadge,
  SubTitle,
  Title,
} from "../../components";
import { UserContext } from "../../userContext";
import { Project, Ticket } from "../Board";
import { TicketPriority, TicketStatus } from "../../enums";
import TicketModal from "../Ticket/TicketModal";
import { Icon } from "../../theme/daisyui";

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
    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === Number(projectId)
          ? { ...p, tickets: [...p.tickets, newTicket] }
          : p
      )
    );
  };

  const removeTicket = (ticketId: number) => {
    const isConfirmed = window.confirm(
      "정말로 이 프로젝트를 삭제하시겠습니까?"
    );

    if (isConfirmed) {
      setProjects((prevProjects) =>
        prevProjects.map((p) =>
          p.id === Number(projectId)
            ? { ...p, tickets: p.tickets.filter((t) => t.id !== ticketId) }
            : p
        )
      );
    }
  };

  const updateTicketStatus = (ticketId: number, newStatus: TicketStatus) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === Number(projectId)
          ? {
              ...p,
              tickets: p.tickets.map((t) =>
                t.id === ticketId ? { ...t, status: newStatus } : t
              ),
            }
          : p
      )
    );
  };

  const updateTicketPriority = (
    ticketId: number,
    newPriority: TicketPriority
  ) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) =>
        p.id === Number(projectId)
          ? {
              ...p,
              tickets: p.tickets.map((t) =>
                t.id === ticketId ? { ...t, priority: newPriority } : t
              ),
            }
          : p
      )
    );
  };

  if (!project) {
    return <Navigate to="/nomatch" replace />;
  }

  return (
    <div>
      <div className="items-center mb-4 mt-4">
        <Title>{project.name}</Title>
        <SubTitle className="mt-2">{project.description}</SubTitle>
      </div>
      <div className="flex justify-between mb-6">
        <div className="content-center">
          <Button
            onClick={openModal}
            optionalStyle="py-2 px-4 w-48 ml-5 rotate-hor-center"
          >
            새 티켓 생성하기
          </Button>
        </div>
        {name && team ? (
          <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 mr-5">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-semibold text-lg text-gray-800">{name}</p>
                <p className="text-sm text-gray-600">{team}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 mr-5">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">
                  {name ? name.charAt(0).toUpperCase() : "G"}
                </span>
              </div>
              <div>
                <p className="font-semibold text-lg text-gray-800">
                  {name || "게스트"}
                </p>
                <p className="text-sm text-gray-600">{team || "소속팀 없음"}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <TicketModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateTicket={createTicket}
      />
      <div className="mt-4">
        <div className="grid grid-cols-12 gap-2 font-bold mb-2 px-4 text-sm">
          <div className="col-span-2">Title</div>
          <div className="col-span-3">Description</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Priority</div>
          <div className="col-span-1">Requester</div>
          <div className="col-span-2">Team</div>
        </div>
        <hr className="border-t-2 border-gray-300" />
        <div className="space-y-2">
          {project.tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="grid grid-cols-12 gap-2 p-4 text-sm items-center">
                <div className="col-span-2 font-medium">
                  <p className="text-gray-600 line-clamp-2">{ticket.title}</p>
                </div>
                <div className="col-span-3">
                  <p className="text-gray-600 line-clamp-2">
                    {ticket.description}
                  </p>
                </div>
                <div className="col-span-2">
                  <StatusBadge
                    status={ticket.status}
                    onChange={(newStatus) =>
                      updateTicketStatus(ticket.id, newStatus)
                    }
                  />
                </div>
                <div className="col-span-2">
                  <PriorityBadge
                    priority={ticket.priority}
                    onChange={(newPriority) =>
                      updateTicketPriority(ticket.id, newPriority)
                    }
                  />
                </div>
                <div className="col-span-1">{ticket.requester}</div>
                <div className="col-span-2 flex flex-row justify-between">
                  {ticket.team}
                  <Icon
                    onClick={() => removeTicket(ticket.id)}
                    name="remove"
                    className="btn-error btn-xs cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
