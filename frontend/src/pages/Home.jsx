import { Link } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <ThemeToggle />

      <h1 className="text-4xl font-bold mb-4">Welcome to FocusHub</h1>
      <p className="text-lg text-center max-w-xl mb-6">
        Boost your productivity with real-time study rooms and Pomodoro timers.
      </p>

      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Home;
