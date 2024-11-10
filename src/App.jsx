import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header"; // Include your Header with ThemeToggle
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import StudyRoom from "./pages/StudyRoom";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import "./styles/index.css"; // Ensure your global styles include theme support

const App = () => {
  return (
    <Router>
      <div>
        {/* Header component with Theme Toggle */}
        <Header />

        {/* Main content of the app */}
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/study-room" element={<StudyRoom />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
