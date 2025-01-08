import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegistrationPage from "./RegistrationPage";
import TestAuthPage from "./TestAuthPage";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define a route for the root path */}
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/test-auth" element={<TestAuthPage />} />
      </Routes>
    </Router>
  );
};

export default App;
