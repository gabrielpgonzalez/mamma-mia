import { useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
// import Home from "./views/Home"
import RegisterPage from "./views/RegisterPage";
import LoginPage from "./views/LoginPage";

function App() {
  const [view, setView] = useState("register"); // register | login
  const [registeredUser, setRegisteredUser] = useState(null);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar onNavigate={setView} />
      <main className="flex-grow-1">
        {view === "register" && (
          <RegisterPage
            setView={setView}
            setRegisteredUser={setRegisteredUser}
          />
        )}
        {view === "login" && <LoginPage registeredUser={registeredUser} />}
        {/* <Home /> se usará más adelante */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
