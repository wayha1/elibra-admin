import React, { useState, useEffect } from "react";
import { NovelBookList } from "./NovelBookList";
import { NovelCrud } from "./NovelCrud";
import { SearchNovelBook } from "./SearchNovelBook";

export const NovelBook = () => {
  const [BookHead, setBookHead] = useState([
    { id: 1, name: "View-Book" },
    { id: 2, name: "Add Book" },
    { id: 3, name: "Search Book" },
  ]);
  const [activeComponent, setActiveComponent] = useState("View-Book");
  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };
  const renderContent = () => {
    switch (activeComponent) {
      case "View-Book":
        return <NovelBookList />;
      case "Add Book":
        return <NovelCrud />;
      case "Search Book":
        return <SearchNovelBook />;
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
          {BookHead.map((head) => (
            <li key={head.id} className="mr-4">
              <span
                className={`${
                  activeComponent === head.name
                    ? "bg-red-500 hover:bg-shadow-xl hover:bg-red-600 rounded-xl text-gray-200"
                    : "text-neutral-100"
                } cursor-pointer font-medium text-center text-2xl p-2 bg-blue-700 hover:bg-shadow-xl hover:bg-blue-600 rounded-xl text-gray-200`}
                onClick={() => handleComponentChange(head.name)}
              >
                {head.name}
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
