import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle"; // Toggle for light/dark mode

const Header = () => {
  return (
    <header className="flex flex-col">
      <div className="flex justify-between items-center p-1">
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
      </div>
      {/* Line Separator */}
      <hr className="border-t border-gray-300 my-2" />
    </header>
  );
};

export default Header;
