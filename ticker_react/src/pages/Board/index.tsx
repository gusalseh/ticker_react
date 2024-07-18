import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Title } from "../../components";
import ProjectModal from "../Project/ProjectModal";
import { Icon } from "../../theme/daisyui";

interface LocationState {
  name?: string;
  team?: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  tickets: any[]; // 'any' 대신 실제 티켓 타입을 사용할 것
}

export default function Board() {
  const location = useLocation();
  const { name, team } = (location.state as LocationState) || {};
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);

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

  return (
    <section className="mt-4">
      {/* <div className="flex justify-between items-center mb-4"> */}
      <div className="items-center mb-4">
        <Title>{team} Board</Title>
      </div>
      <div className="flex justify-between mb-6">
        <Button onClick={openModal} optionalStyle="py-2 px-4 w-48 ml-4">
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
            <div>
              <h3 className="font-bold">{project.name}</h3>
              <p>{project.description}</p>
            </div>
            <div>
              <Icon name="remove" className="btn-error btn-xs"></Icon>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
