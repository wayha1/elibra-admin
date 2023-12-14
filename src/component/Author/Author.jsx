import React, { useState, useEffect } from "react";
import { AddAuthor } from "./AddAuthor";
import { AuthorList } from "./AuthorList";
import  SeachAuthor  from "./SeachAuthor";
// import { db } from "../../firebase";
// import { Link, useLocation } from "react-router-dom";

export const Author = () => {
  const [CRUD, setCRUD] = useState([
    { id: 1, name: "View List" },
    { id: 2, name: "Add Author" },
    { id: 3, name: "Search Author" },
  ]);
  const [activeComponent, setActiveComponent] = useState("View List");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };
  const renderContent = () => {
    switch (activeComponent) {
      case "View List":
        return <AuthorList />;
      case "Add Author":
        return <AddAuthor />;
      case "Search Author":
        return <SeachAuthor />;
      default:
        return (
          <div className="text-center text-2xl font-medium ">
            No content available for : {activeComponent}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col w-auto">
      {/* Header */}
      <div className="bg-shadow-lg p-4 bg-neutral-500 ">
        <ul className="flex items-center justify-center">
          {CRUD.map((crud) => (
            <li key={crud.id} className="mr-4">
              <span
                className={`${
                  activeComponent === crud.name
                    ? "bg-red-500 hover:bg-shadow-xl hover:bg-red-600 rounded-xl text-gray-200"
                    : "text-neutral-100"
                } cursor-pointer font-medium text-center text-2xl p-2 bg-blue-700 hover:bg-shadow-xl hover:bg-blue-600 rounded-xl text-gray-200`}
                onClick={() => handleComponentChange(crud.name)}
              >
                {crud.name}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Section */}
      <div className="flex-grow bg-neutral-200 p-4">{renderContent()}</div>
    </div>
  );
};
