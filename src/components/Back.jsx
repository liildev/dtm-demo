import React from "react";
import { useNavigate } from "react-router-dom";
import arrow from "../assets/svg/arrow.svg";

export default function Back() {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(-1);
  };
  return (
    <button
      onClick={handleNavigate}
      style={{ marginTop: "2rem", display: "flex", alignItems: 'center' }}
    >
      <img src={arrow} alt="Arrow" />
      <span style={{ fontSize: 18 }} className="ml-2">
        Orqaga
      </span>
    </button>
  );
}
