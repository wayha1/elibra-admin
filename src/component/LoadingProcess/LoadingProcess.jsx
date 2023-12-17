import React from "react";
import "./loading.css";

export const LoadingProcess = () => {
  return (
    <div className="flex fixed inset-0 z-50 items-center justify-center bg-gray-100 opacity-75">
      <div className="loader"></div>
    </div>
  );
};
