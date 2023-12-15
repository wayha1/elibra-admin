import React from "react";

export const LoadingProcess = () => {
  return (
    <div className="flex fixed absolute inset-0 z-50 items-center justify-center bg-gray-100 opacity-75">
      <div className=" animate-spin rounded-full border-t-4 border-blue-500 border-solid border-8 h-32 w-32"></div>
    </div>
  );
};
