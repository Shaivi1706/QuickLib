import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

const AdminPanel = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    shelfLocation: "",
    quantity: 0,
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/books");
      const data = await response.json();
      console.log(data); // Check if books array exists
      setBooks(data.books || data); // Update based on actual API response
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  

  const addBook = async () => {
    if (!newBook.title || !newBook.author || !newBook.shelfLocation || newBook.quantity <= 0) {
      alert("Please fill in all fields correctly!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBook),
      });

      const data = await response.json();
      if (data.book) {
        alert("Book added successfully!");
        fetchBooks();
        setNewBook({ title: "", author: "", shelfLocation: "", quantity: 0 });
      }
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  const deleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await fetch(`http://localhost:3001/api/books/${id}`, { method: "DELETE" });
      alert("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 0) {
      alert("Quantity cannot be negative!");
      return;
    }

    try {
      await fetch(`http://localhost:3001/api/books/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });

      fetchBooks();
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 text-center">Admin Panel</h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Add a New Book</h2>
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded my-4"
            value={newBook.title}
            onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Author"
            className="border p-2 rounded"
            value={newBook.author}
            onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
          />
          <input
            type="text"
            placeholder="Shelf Location"
            className="border p-2 rounded"
            value={newBook.shelfLocation}
            onChange={(e) => setNewBook({ ...newBook, shelfLocation: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            className="border p-2 rounded"
            value={newBook.quantity}
            onChange={(e) => setNewBook({ ...newBook, quantity: parseInt(e.target.value) || 0 })}
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            onClick={addBook}
          >
            Add Book
          </button>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-2  my-4">Book List</h2>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border p-3">Title</th>
            <th className="border p-3">Author</th>
            <th className="border p-3">Shelf Location</th>
            <th className="border p-3">Quantity</th>
            <th className="border p-3">QR Code</th>
            <th className="border p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length === 0 ? (
            <tr>
              <td colSpan="6" className="border p-3 text-center text-gray-500">
                No books available. Add some books to get started.
              </td>
            </tr>
          ) : (
            books.map((book) => (
              <tr key={book._id} className="hover:bg-gray-100">
                <td className="border p-3">{book.title}</td>
                <td className="border p-3">{book.author}</td>
                <td className="border p-3">{book.shelfLocation}</td>
                <td className="border p-3">
                  <input
                    type="number"
                    className="border p-1 w-16 text-center rounded"
                    value={book.quantity}
                    onChange={(e) => updateQuantity(book._id, parseInt(e.target.value) || 0)}
                  />
                </td>
                <td className="border p-3">
                  <QRCodeCanvas
                    value={`Title: ${book.title}, Author: ${book.author}`}
                    size={50}
                  />
                </td>
                <td className="border p-3 text-center">
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                    onClick={() => deleteBook(book._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPanel;
