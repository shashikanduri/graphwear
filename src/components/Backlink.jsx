import React from "react";
import { FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
const Backlink = ({ children, navigationPath = -1 }) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center text-primary hover:text-secondary">
      <FaAngleLeft className="w-4 h-4 mt-0.5" />
      <button onClick={() => navigate(navigationPath)}>
        {children ?? "Back"}
      </button>
    </div>
  );
};

export default Backlink;
