import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="p-6">
      <h2>404 - Page Not Found</h2>
      <p>The page you are looking for doesn’t exist.</p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

export default NotFound;
