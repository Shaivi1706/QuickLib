import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="p-10 text-center bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-brown-700 mb-6">
        Welcome to <span className="text-blue-500">QuickLib!</span>
      </h1>
      <p className="text-xl text-gray-700 mb-6">
        Scan the QR code on any book to instantly find its location in the library. No more searching—just scan and go!
      </p>

      <div className="mt-8">
        <button
          onClick={() => navigate("/search")}
          className="px-6 py-3 bg-blue-500 text-black text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 mx-4"
        >
          Search Books
        </button>
        <button
          onClick={() => navigate("/admin")}
          className="px-6 py-3 bg-green-500 text-black text-lg font-semibold rounded-lg shadow-md hover:bg-green-600"
        >
          Add a New Book
        </button>
      </div>
    </div>
  );
};

export default Home;
