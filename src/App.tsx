import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import PersonalCabinet from "./pages/PersonalCabinet/PersonalCabinet";
import Grades from "./pages/Grades/Grades";
import Reports from "./pages/Reports/Reports";
import { mockUsers } from "./mockUsers";

function App() {
  const [currentUser, setCurrentUser] = useState(mockUsers[1]);

  return (
    <div className="App">
      <Router>
        <Header user={currentUser} />
        <div style={{ paddingTop: "86px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/profile" element={<PersonalCabinet />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
