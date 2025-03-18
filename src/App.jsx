import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./Views/UserContext";
import Navbar from "./components/Navbar";
import RegisterPage from "./Views/RegisterPage";
import LoginPage from "./Views/LoginPage";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Pizza from "./Views/pizza/Pizza.jsx";

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Navbar />
      </Router>
      {/*       <RegisterPage />
      <LoginPage /> */}
      {/*       <Home /> */}
      <Pizza />
      <Footer />
    </UserProvider>
  );
};

export default App;
