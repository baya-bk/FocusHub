import { Sun, Moon } from "@phosphor-icons/react";
import { useTheme } from "../context/ThemeProvider";

function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme("light")}>
        <Sun size={24} />
        <span>Light</span>
      </button>
      <button onClick={() => setTheme("dark")}>
        <Moon size={24} />
        <span>Dark</span>
      </button>
      <button onClick={() => setTheme("system")}>
        <span>System</span>
      </button>
    </div>
  );
}

export default ModeToggle;
