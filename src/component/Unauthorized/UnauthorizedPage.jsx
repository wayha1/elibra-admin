import React from "react";

const UnauthorizedPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center p-8 bg-gray-200 rounded-md hover:scale-105 transition-transform shadow-lg">
        <h2 className="text-4xl font-bold mb-4">Unauthorized Access</h2>
        <p className="text-lg">You do not have permission to access this page.</p>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
