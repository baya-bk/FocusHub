// /frontend/src/features/timer/Pomodoro.jsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";

const PomodoroTimer = ({ roomId, socket }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Sync with server updates
  useEffect(() => {
    if (!socket) return;

    socket.on("updateTimer", ({ time, running }) => {
      setTimeLeft(time);
      setIsRunning(running);
    });

    return () => socket.off("updateTimer");
  }, [socket]);

  // Control functions
  const startTimer = () => {
    if (!isRunning && socket.connected) {
      socket.emit("updateTimer", { roomId, time: timeLeft, running: true });
    }
  };

  const pauseTimer = () => {
    if (isRunning && socket.connected) {
      socket.emit("updateTimer", { roomId, time: timeLeft, running: false });
    }
  };

  const resetTimer = () => {
    if (socket.connected) {
      socket.emit("updateTimer", { roomId, time: 25 * 60, running: false });
    }
  };

  return (
    <Card className="w-full max-w-md mt-4">
      <CardHeader>
        <h3 className="text-lg font-semibold">Pomodoro Timer</h3>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="text-3xl font-bold">
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </div>
        <div className="flex gap-4 mt-4">
          <Button
            onClick={startTimer}
            disabled={isRunning || !socket?.connected}
          >
            Start
          </Button>
          <Button
            onClick={pauseTimer}
            variant="secondary"
            disabled={!isRunning}
          >
            Pause
          </Button>
          <Button onClick={resetTimer} variant="destructive">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;
