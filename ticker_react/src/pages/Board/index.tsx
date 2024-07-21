import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Title } from "../../components";
import ProjectModal from "../Project/ProjectModal";
import { Icon } from "../../theme/daisyui";
import { Link } from "react-router-dom";
import { UserContext } from "../../userContext";

export enum TicketStatus {
  TODO = "todo",
  INPROGRESS = "in progress",
  PENDING = "pending",
  RESOLVED = "resolved",
  CLOSED = "closed",
  ARCHIVED = "archived",
}

export enum TicketPriority {
  MEDIUM = "medium",
  HIGH = "high",
  LOW = "low",
}

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
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  return (
    <section className="mt-4">
      {/* <div className="flex justify-between items-center mb-4"> */}
      <div className="items-center mb-4">
        <Title>{team} Board</Title>
      </div>
      <div className="flex justify-between mb-6">
        <Button
          onClick={openModal}
          optionalStyle="py-2 px-4 w-48 ml-4 rotate-vert-center"
        >
          새 프로젝트 생성하기
        </Button>
        {name && team ? (
          <div>
            <p>이름: {name}</p>
            <p>소속팀: {team}</p>
          </div>
        ) : (
          <p>이름과 소속팀 정보가 없습니다.</p>
        )}
      </div>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateProject={createProject}
      />
      <div className="mt-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-row justify-between border p-4 mb-2"
          >
            <div className="w-40">
              <Link to={`/project/${project.id}`} key={project.id}>
                <div>
                  <h3 className="font-bold line-clamp-2">{project.name}</h3>
                  <p className="line-clamp-3">{project.description}</p>
                </div>
              </Link>
            </div>
            <div>
              <Icon
                onClick={() => removeProject(project.id)}
                name="remove"
                className="btn-error btn-xs"
              ></Icon>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
