import React, { useContext, useState } from "react";
import Logo from "../../images/oglogo.png";
import Slogan from "../../images/slogan.png";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components";
import { UserContext } from "../../userContext";
import { GoogleLogin } from "@react-oauth/google";
import { jwt_decode } from "jwt-decode-es";

export default function LandingPage() {
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");

  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const { setUserInfo } = userContext;

  const handleButtonClick = () => {
    setUserInfo(name, team);
    navigate("./board");
  };

  interface GoogleUser {
    email: string;
    name: string;
    picture: string;
  }

  const onSuccess = (credentialResponse: any) => {
    const decoded = jwt_decode(credentialResponse.credential) as GoogleUser;
    navigate("/board", { state: { user: decoded } });
  };

  const onError = () => {
    console.log("Login Failed");
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-3 mb-4 input input-bordered"
              name="team"
              placeholder="소속팀"
              value={team}
              onChange={(e) => setTeam(e.target.value)}
            />
            <Button
              type="submit"
              onClick={handleButtonClick}
              optionalStyle="w-full"
            >
              티커 생성
            </Button>
            <div className="mt-5 pl-20">
              <GoogleLogin onSuccess={onSuccess} onError={onError} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
