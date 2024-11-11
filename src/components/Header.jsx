import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle"; // Toggle for light/dark mode

const Header = () => {
  return (
    <header className="flex justify-between items-center p-1 bg-gray-800 text-white">
      <h1 className="text-xl font-bold">
        <Link to="/">FocusHub</Link>
      </h1>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/study-room">Study Room</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </nav>
      <ThemeToggle />
    </header>
  );
};

export default Header;
