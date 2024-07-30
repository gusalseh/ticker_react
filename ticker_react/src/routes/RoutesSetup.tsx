import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Board, { Project } from "../pages/Board";
import Layout from "./Layout";
import ProjectDetail from "../pages/ProjectDetail";
import { useState } from "react";
import NoMatch from "./NoMatch";
import { UserProvider } from "../userContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function RoutesSetup() {
  const [projects, setProjects] = useState<Project[]>([]);

  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
    >
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route
              path="board"
              element={<Board projects={projects} setProjects={setProjects} />}
            />
            <Route
              path="project/:projectId"
              element={
                <ProjectDetail projects={projects} setProjects={setProjects} />
              }
            />
          </Route>
          {/* <Route path="/board" element={<Board />} /> */}
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}
