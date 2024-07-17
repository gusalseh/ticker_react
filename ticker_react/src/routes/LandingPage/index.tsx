import React from "react";
import Logo from "../../images/oglogo.png";
import Slogan from "../../images/slogan.png";

export default function LandingPage() {
  return (
    <div>
      <img src={Logo}></img>
      <img src={Slogan}></img>
      <p className="text-blue-700">랜딩페이지</p>
    </div>
  );
}
