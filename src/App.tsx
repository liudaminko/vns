import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import PersonalCabinet from "./pages/PersonalCabinet/PersonalCabinet";
import Grades from "./pages/Grades/Grades";
import Reports from "./pages/Reports/Reports";
import { mockUsers, User } from "./mockUsers";
import { SidebarProvider } from "./SidebarContext";

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token && userId) {
      const user = mockUsers.find((user) => user.id === Number(userId));
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleVerifyCode = (token: string, userId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userId);

    const user = mockUsers.find((user) => user.id === Number(userId));
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <SidebarProvider>
      <div className="App">
        <Router>
          <Header user={currentUser} onLogout={handleLogout} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/auth"
              element={
                isAuthenticated ? (
                  <Navigate to="/" />
                ) : (
                  <Auth onVerify={handleVerifyCode} />
                )
              }
            />
            <Route
              path="/profile"
              element={
                isAuthenticated ? <PersonalCabinet /> : <Navigate to="/auth" />
              }
            />
            <Route
              path="/grades"
              element={isAuthenticated ? <Grades /> : <Navigate to="/auth" />}
            />
            <Route
              path="/reports"
              element={isAuthenticated ? <Reports /> : <Navigate to="/auth" />}
            />
          </Routes>
          <Footer />
        </Router>
      </div>
    </SidebarProvider>
  );
}

export default App;
