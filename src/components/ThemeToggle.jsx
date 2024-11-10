import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "@phosphor-icons/react";
import { Button } from "./ui/Button";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button onClick={toggleTheme} style={{ fontSize: "1.2rem" }}>
      {theme === "light" ? <Moon /> : <Sun />}
      {theme === "light" ? "Dark Mode" : "Light Mode"}
    </Button>
  );
};

export default ThemeToggle;
