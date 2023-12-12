import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Management } from "../../Management";
import { Author } from "../Author/Author";
import { NovelBook } from "../NovelBook/NovelBook";

export const Dashboard = () => {
  const navigate = useNavigate();

  const renderContent = () => {
    switch (window.location.pathname) {
      case "/dashboard/management":
        return <Management />;
      case "/dashboard/author":
        return <Author />;
      case "/dashboard/novel-book":
        return <NovelBook />;
      default:
        return (
          <div className="text-center text-2xl font-medium">
            No content available for: {window.location.pathname}
          </div>
        );
    }
  };

  return (
    <div className="w-full h-screen flex">
      <div className="flex flex-col w-[25%] h-screen bg-neutral-300 bg-shadow-lg">
        <p className="mt-10 text-center text-cyan-600 text-3xl font-sans uppercase font-bold">Dashboard</p>

        <ul className="mt-20 duration-300">
          <li className="flex items-center justify-center">
            <Link
              to="/dashboard/management"
              className={`${
                window.location.pathname === "/dashboard/management"
                  ? "bg-gray-900 text-white"
                  : "bg-neutral-100"
              } w-full h-[70px]  border text-center font-bold text-xl p-3 uppercase cursor-pointer`}
            >
              Management
            </Link>
          </li>
          <li className="flex items-center justify-center">
            <Link
              to="/dashboard/author"
              className={`${
                window.location.pathname === "/dashboard/author" ? "bg-gray-900 text-white" : "bg-neutral-100"
              } w-full h-[70px] border text-center font-bold text-xl p-3 uppercase cursor-pointer`}
            >
              អ្នកនិពន្ធ
            </Link>
          </li>
          <li className="flex items-center justify-center">
            <Link
              to="/dashboard/novel-book"
              className={`${
                window.location.pathname === "/dashboard/novel-book"
                  ? "bg-gray-900 text-white"
                  : "bg-neutral-100"
              } w-full h-[70px] border text-center font-bold text-xl p-3 uppercase cursor-pointer`}
            >
              សៀវភៅ ប្រលោមលោក
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex-grow overflow-y-auto bg-neutral-200 w-[75%] ">{renderContent()}</div>
    </div>
  );
};
