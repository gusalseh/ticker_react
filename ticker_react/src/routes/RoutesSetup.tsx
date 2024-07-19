import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Board, { Project } from "../pages/Board";
import Layout from "./Layout";
import ProjectDetail from "../pages/ProjectDetail";
import { useState } from "react";

export default function RoutesSetup() {
  const [projects, setProjects] = useState<Project[]>([]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route
          path="board"
          element={<Board projects={projects} setProjects={setProjects} />}
        />
        <Route
          path="project/:projectId"
          element={<ProjectDetail projects={projects} />}
        />
      </Route>
      {/* <Route path="/board" element={<Board />} /> */}
    </Routes>
  );
}
