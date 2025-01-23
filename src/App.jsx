import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Views/UserContext";
import Navbar from "./components/Navbar";
import RegisterPage from "./Views/RegisterPage";
import LoginPage from "./Views/LoginPage";
import Home from "./components/Home";
import Footer from "./components/Footer";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
      </Router>
      <RegisterPage />
      <LoginPage />
      <Home />
      <Footer />
    </UserProvider>
  );
};

export default App;
