import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import CreateAssignment from "./pages/CreateAssignment";
import TakeAssignment from "./pages/TakeAssignment";
import Navbar from "./components/Navbar";
import PrivateRoute from "./routes/PrivateRoutes";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element= {<PrivateRoute> {<Dashboard />}</PrivateRoute>} />
        <Route
  path="/create-assignment"
  element={
    <PrivateRoute>
      <CreateAssignment />
    </PrivateRoute>
  }
/>
        <Route path="/take-assignment/:id" element={<TakeAssignment />} />
      </Routes>
    </div>
  );
}

export default App;