import React, { useState, useEffect } from "react";
import { AddAuthor } from "./AddAuthor";
import { AuthorList } from "./AuthorList";
import SeachAuthor from "./SeachAuthor";

export const Author = () => {
  const [CRUD, setCRUD] = useState([
    { id: 1, name: "Author List" },
    { id: 2, name: "Add Author" },
    // { id: 3, name: "Search Author" },
  ]);
  const [activeComponent, setActiveComponent] = useState("Author List");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };
  const renderContent = () => {
    switch (activeComponent) {
      case "Author List":
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
    <div className="flex flex-col">
      {/* Header */}
      <ul className="flex items-center justify-center bg-shadow-lg py-3 bg-white ">
        {CRUD.map((crud) => (
          <li key={crud.id} className="hover:scale-110 transition duration-150 ease-in-out whitespace-nowrap">
            <span
              className={`${
                activeComponent === crud.name
                  ? " hover:bg-shadow-xl text-gray-700"
                  : "text-gray-400 hover:underline hover:text-gray-700 hover:bg-gray-100 hover:rounded-lg hover:bg-shadow-xl"
              } cursor-pointer font-navbar font-bold text-center text-2xl p-2 hover:bg-shadow-xl text-gray-200`}
              onClick={() => handleComponentChange(crud.name)}
            >
              {crud.name}
            </span>
          </li>
        ))}
      </ul>
      {/* Content Section */}
      <div className="flex-grow bg-neutral-200 px-4 py-3 transition duration-150 ease-in-out">
        {renderContent()}
      </div>
    </div>
  );
};
