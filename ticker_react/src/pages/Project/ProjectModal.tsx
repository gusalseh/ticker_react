import React, { useState } from "react";
import { Button } from "../../components";
import { Icon } from "../../theme/daisyui";

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateProject: (name: string, description: string) => void;
}

const PROJECT_NAME_LIMIT = 20;
const PROJECT_DESCRIPTION_LIMIT = 50;

export default function ProjectModal({
  isOpen,
  onClose,
  onCreateProject,
}: ProjectModalProps) {
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (projectName.length > PROJECT_NAME_LIMIT) {
      alert(`프로젝트 이름은 ${PROJECT_NAME_LIMIT}자 이내로 작성해주세요.`);
      return;
    }

    if (projectDescription.length > PROJECT_DESCRIPTION_LIMIT) {
      alert(
        `프로젝트 설명은 ${PROJECT_DESCRIPTION_LIMIT}자 이내로 작성해주세요.`
      );
      return;
    }

    onCreateProject(projectName, projectDescription);
    setProjectName("");
    setProjectDescription("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex flex-row justify-between">
          <h3 className="text-lg font-bold mb-4">새로운 프로젝트</h3>
          <Icon
            name="remove"
            className="btn-error btn-xs"
            onClick={onClose}
          ></Icon>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectName"
            >
              프로젝트 이름
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProjectName(e.target.value)
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="projectDescription"
            >
              프로젝트 설명
            </label>
            <textarea
              id="projectDescription"
              value={projectDescription}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setProjectDescription(e.target.value)
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={3}
              required
            ></textarea>
          </div>
          <div className="flex items-center justify-end">
            <Button type="submit" optionalStyle="w-30">
              생성
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
