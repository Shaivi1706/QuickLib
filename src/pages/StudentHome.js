import React, { useState } from "react";
import Home from "./Home";
import Search from "./Search";

const StudentHome = () => {
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-blue-500">Welcome, Student!</h1>
        <p className="text-gray-600">Explore QuickLib to make your library experience seamless.</p>
      </header>

      {/* Navigation */}
      <div className="flex justify-center gap-6 mb-8">
        <button
          onClick={() => setActivePage("home")}
          className={`px-6 py-3 rounded-lg font-semibold ${
            activePage === "home" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          } hover:bg-blue-500`}
        >
          Home
        </button>
        <button
          onClick={() => setActivePage("search")}
          className={`px-6 py-3 rounded-lg font-semibold ${
            activePage === "search" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
          } hover:bg-blue-500`}
        >
          Search Books
        </button>
      </div>

      {/* Content */}
      <div className="content">
        {activePage === "home" && <Home />}
        {activePage === "search" && <Search />}
      </div>
    </div>
  );
};

export default StudentHome;
