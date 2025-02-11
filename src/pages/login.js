import React from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:5000/login', { username, password });
    if (response.data.userType === 'admin') {
      navigate('/admin'); // Redirect to Admin page
    } else {
      navigate('/search'); // Redirect to Student search page
    }
  } catch (err) {
    console.error('Login failed ❌', err.message);
    alert('Invalid credentials');
  }
};

const Login = () => {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate("/home");
  };

  const handleStudentLogin = () => {
    navigate("/student-home");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Centered Box */}
      <div className="p-10 bg-white rounded-lg shadow-2xl text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6">Login</h1>
        <div className="space-y-4">
          <button
            onClick={handleAdminLogin}
            className="w-full px-6 py-3 mx-4 bg-blue-500 text-black rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600"
          >
            Admin Login
          </button>
          <button
            onClick={handleStudentLogin}
            className="w-full px-6 py-3 mx-4 bg-green-500 text-black rounded-lg text-lg font-semibold shadow-md hover:bg-green-600"
          >
            Student Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
