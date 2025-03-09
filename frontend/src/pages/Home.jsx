import { Button } from "@/components/ui/button"; // Import ShadCN Button
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
        <Link to="/login">
          <Button variant="primary" className="px-6 py-2">
            Login
          </Button>
        </Link>
        <Link to="/signup">
          <Button variant="secondary" className="px-6 py-2">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
