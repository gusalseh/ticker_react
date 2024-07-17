import React from "react";
import Logo from "../../images/oglogo.png";
import Slogan from "../../images/slogan.png";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("./board");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 md:px-0">
      <div className="flex flex-row w-full max-w-4xl space-x-28">
        <div className="flex flex-col items-center justify-center flex-1 space-y-8">
          <img src={Logo} className="jello-horizontal" alt="Logo"></img>
          <img src={Slogan} alt="Slogan"></img>
        </div>
        <div className="flex flex-col items-center justify-center flex-1">
          <div className="w-full px-6 py-8 text-black bg-white rounded shadow-md">
            <h1 className="mb-8 text-2xl text-center font-bold">Ticket Box</h1>
            <input
              type="text"
              className="w-full p-3 mb-4 input input-bordered"
              name="name"
              placeholder="이름"
            />
            <input
              type="text"
              className="w-full p-3 mb-4 input input-bordered"
              name="team"
              placeholder="소속팀"
            />
            <button
              type="submit"
              className="w-full btn btn-square bg-orange-400 font-sans"
              onClick={handleButtonClick}
            >
              티커 생성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
