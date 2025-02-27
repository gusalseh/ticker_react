import React, { useContext, useState } from "react";
import { Button, StatusStaticBadge, Title } from "../../components";
import ProjectModal from "../Project/ProjectModal";
import { Icon } from "../../theme/daisyui";
import { Link } from "react-router-dom";
import { UserContext } from "../../userContext";
import { TicketStatus, TicketPriority } from "../../enums";

export interface Ticket {
  id: number;
  title: string;
  description: string;
  requester: string;
  team: string;
  status: TicketStatus;
  priority: TicketPriority;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  tickets: Ticket[];
}

interface Boardprops {
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export default function Board({ projects, setProjects }: Boardprops) {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a UserProvider");
  }
  const { name, team } = userContext;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const createProject = (
    projectName: string,
    projectDescription: string
  ): void => {
    const newProject = {
      id: Date.now(),
      name: projectName,
      description: projectDescription,
      tickets: [],
    };

    // setProjects([...projects, newProject]);
    setProjects((prevProjects) => [...prevProjects, newProject]);
    closeModal();
  };

  const removeProject = (projectId: number) => {
    const isConfirmed = window.confirm(
      "정말로 이 프로젝트를 삭제하시겠습니까?"
    );

    if (isConfirmed) {
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== projectId)
      );
    }
  };

  return (
    <section className="mt-4">
      <div className="items-center mb-4">
        <Title>{team} Board</Title>
      </div>
      <div className="flex justify-between mb-6">
        <div className="content-center">
          <Button
            onClick={openModal}
            optionalStyle="py-2 px-4 w-48 ml-5 rotate-hor-center"
          >
            새 프로젝트 생성하기
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
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateProject={createProject}
      />
      <div className="mt-4 pl-5 pr-5">
        {projects.map((project) => (
          <div key={project.id} className="flex items-stretch border p-4 mb-2">
            <div className="w-40 flex-shrink-0">
              <Link to={`/project/${project.id}`} key={project.id}>
                <div>
                  <h3 className="font-bold line-clamp-1">{project.name}</h3>
                  <p className="line-clamp-2">{project.description}</p>
                </div>
              </Link>
            </div>
            <div className="flex-grow overflow-x-auto ml-10 mr-10">
              <div className="flex space-x-4 pb-4">
                {project.tickets.map((ticket) => (
                  <Link to={`/project/${project.id}`} key={project.id}>
                    <div
                      key={ticket.id}
                      className="flex-shrink-0 w-40 bg-gray-100 rounded-lg p-3"
                    >
                      <h3 className="font-semibold text-sm mb-2 truncate">
                        {ticket.title}
                      </h3>
                      <StatusStaticBadge status={ticket.status} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <Icon
                onClick={() => removeProject(project.id)}
                name="remove"
                className="btn-error btn-xs"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
