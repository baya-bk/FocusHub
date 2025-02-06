import { Sun, Moon } from "@phosphor-icons/react"; // Import necessary icons
import { useTheme } from "../context/ThemeProvider";
import { Button } from "./ui/button";
import { useState } from "react";

function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [nextTheme, setNextTheme] = useState(getNextTheme(theme));

  function getNextTheme(currentTheme) {
    switch (currentTheme) {
      case "light":
        return "dark";
      default:
        return "light";
    }
  }

  const handleToggle = () => {
    setTheme(nextTheme);
    setNextTheme(getNextTheme(nextTheme));
  };

  return (
    <Button onClick={handleToggle} variant="outline" size="icon">
      {nextTheme === "light" && <Sun size={24} />}
      {nextTheme === "dark" && <Moon size={24} />}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default ModeToggle;
