import React from "react";
import { useLocation } from "react-router-dom";

export default function Board() {
  const location = useLocation();
  const { name, team } = location.state || {};

  return (
    <div>
      <h1>Board Page</h1>
      {name && team ? (
        <div>
          <p>이름: {name}</p>
          <p>소속팀: {team}</p>
        </div>
      ) : (
        <p>이름과 소속팀 정보가 없습니다.</p>
      )}
    </div>
  );
}
