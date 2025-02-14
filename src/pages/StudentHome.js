import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const StudentHome = () => {
  const [searchField, setSearchField] = useState("title");
    const [searchValue, setSearchValue] = useState("");
    const [books, setBooks] = useState([]);
    const [error, setError] = useState("");
    const [isSearching, setIsSearching] = useState(false);
  
    const handleSearch = async () => {
      if (!searchValue.trim()) {
        setError("Please enter a value to search.");
        setBooks([]);
        return;
      }
    
      const url = `http://localhost:3001/books/search?${searchField}=${searchValue}`;
      console.log("API URL:", url); // Debugging URL
    
      setError("");
      try {
        const response = await fetch(url);
    
        if (!response.ok) {
          throw new Error(`Failed to fetch books: ${response.status} ${response.statusText}`);
        }
    
        const data = await response.json();
    
        if (data.books) {
          setBooks(data.books);
        } else {
          setBooks([]);
          setError("No books found matching your criteria.");
        }
      } catch (err) {
        console.error("Error occurred while searching:", err.message);
        setError("An error occurred while searching. Please try again later.");
      }
    };
    
  
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-blue-500">Welcome, Student!</h1>
        <p className="text-gray-600">Explore QuickLib to make your library experience seamless.</p>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center">Search Book</h2>
      
            <div className="flex flex-wrap items-center mb-6 gap-4">
              {/* Search Field Selector */}
              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
              </select>
      
              {/* Search Input */}
              <input
                type="text"
                placeholder={`Enter ${searchField}`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="border p-2 rounded flex-1"
              />
      
              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-blue-500 text-white rounded"
                disabled={isSearching}
              >
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>
      
            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}
      
            {/* Books List */}
            <div>
              {books.length > 0 ? (
                books.map((book) => (
                  <div key={book._id} className="border p-4 mb-4">
                    <h3 className="text-lg font-bold">{book.title}</h3>
                    <p>Author: {book.author}</p>
                    <p>Genre: {book.genre}</p>
                    <QRCodeCanvas
                      value={`Title: ${book.title}, Author: ${book.author}, Genre: ${book.genre}`}
                      className="mt-2"
                    />
                  </div>
                ))
              ) : (
                !isSearching && !error && <p>No results to display. Start searching!</p>
              )}
            </div>
          </div>
      

      {/* Content */}
      {/* <div className="content">
        {activePage === "home" && <Home />}
        {activePage === "search" && <Search />}
      </div> */}
    </div>
  );
};

export default StudentHome;
