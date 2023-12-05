import React, { useState, useEffect } from "react";
import { Management } from "../../Management";
import { Author } from "../Author/Author";
import { AddAuthor } from "../Author/AddAuthor";

export const Dashboard = () => {
  const [categories, setCategories] = useState([
    // { id: 1, name: "Dashboard" },
    { id: 2, name: "Management" },
    { id: 3, name: "Author" },
    { id: 4, name: "Comic Book" },
    { id: 5, name: "Comdy-Book" },
    { id: 6, name: "Study-Book" },
    { id: 7, name: "Ministry-Book" },
    { id: 8, name: "Novel-Book" },
    { id: 9, name: "Mathematic" },
  ]);

  const [activeComponent, setActiveComponent] = useState("Management");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };
  const renderContent = () => {
    switch (activeComponent) {
      case "Management":
        return <Management />;
      case "Author":
        return <Author />;
      // case "Comic":
      //   return <ComicBook />;
      // case "Study":
      //   return <StudyBook />;
      // case "Novel":
      //   return <NovelBook />;
      default:
        return (
          <div className="text-center text-2xl font-medium ">
            No content available for : {activeComponent}
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full flex">
      <div className="flex flex-col w-[300px] h-screen bg-neutral-300 bg-shadow-lg">
        <p className="mt-10 text-center text-cyan-600 text-3xl p-2 font-sans uppercase font-bold">
          Dashboard
        </p>

        <ul className="mt-20">
          {categories.map((category) => (
            <li key={category.id} className="flex m-1 items-center justify-center">
              <span
                className={`${
                  activeComponent === category.name ? "bg-blue-700 text-white" : "bg-neutral-100"
                } w-full h-[70px] border text-center font-medium text-xl p-3 uppercase cursor-pointer`}
                onClick={() => handleComponentChange(category.name)}
              >
                {category.name}
              </span>
            </li>
          ))}
        </ul>
      </div>
      {/* Content Section */}
      <div className="flex-grow bg-neutral-200 ">{renderContent()}</div>
    </div>
  );
};
