import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Board from "../pages/Board";
import Layout from "./Layout";

export default function RoutesSetup() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
      </Route>
      <Route path="/board" element={<Board />} />
    </Routes>
  );
}
