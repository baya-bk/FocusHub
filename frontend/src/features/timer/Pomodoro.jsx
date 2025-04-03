// /frontend/src/features/timer/Pomodoro.jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";

const PomodoroTimer = ({ roomId, socket, connectionStatus }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("work"); // "work", "shortBreak", "longBreak"
  const [cycleCount, setCycleCount] = useState(0); // Number of completed work sessions

  // Sync with server updates
  useEffect(() => {
    if (!socket) return;

    socket.on("updateTimer", ({ time, running, phase, cycleCount }) => {
      setTimeLeft(time);
      setIsRunning(running);
      setPhase(phase || "work");
      setCycleCount(cycleCount || 0);
    });

    return () => socket.off("updateTimer");
  }, [socket]);

  const startTimer = () => {
    if (!isRunning && socket?.connected) {
      socket.emit("updateTimer", { roomId, time: timeLeft, running: true });
    }
  };

  const pauseTimer = () => {
    if (isRunning && socket?.connected) {
      socket.emit("updateTimer", { roomId, time: timeLeft, running: false });
    }
  };

  const resetTimer = () => {
    if (socket?.connected) {
      socket.emit("updateTimer", {
        roomId,
        time: 25 * 60,
        running: false,
        phase: "work", // Reset to work phase
        cycleCount: 0, // Reset cycle count
      });
    }
  };

  // Display phase text
  const getPhaseDisplay = () => {
    switch (phase) {
      case "work":
        return "Work Time";
      case "shortBreak":
        return "Short Break";
      case "longBreak":
        return "Long Break";
      default:
        return "Work Time";
    }
  };

  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <h3 className="text-lg font-semibold">Pomodoro Timer</h3>
        <div className="text-sm text-gray-600">
          {getPhaseDisplay()} (Cycle {cycleCount + 1})
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="text-3xl font-bold">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </div>
        <div className="flex gap-4 mt-4">
          <Button
            onClick={startTimer}
            disabled={isRunning || connectionStatus !== "connected"}
          >
            Start
          </Button>
          <Button
            onClick={pauseTimer}
            variant="secondary"
            disabled={!isRunning || connectionStatus !== "connected"}
          >
            Pause
          </Button>
          <Button
            onClick={resetTimer}
            variant="destructive"
            disabled={connectionStatus !== "connected"}
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;
