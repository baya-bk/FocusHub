import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionType, setSessionType] = useState("Work"); // "Work" or "Break"

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime === 0) {
            setSessionType((prev) => (prev === "Work" ? "Break" : "Work"));
            return prev === "Work" ? 5 * 60 : 25 * 60; // Switch durations
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, sessionType]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-6">
      <CardHeader>
        <h2 className="text-xl font-semibold text-center">
          {sessionType} Session
        </h2>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <p className="text-4xl font-bold">{formatTime(timeLeft)}</p>
        <div className="mt-4 flex space-x-3">
          <Button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? "Pause" : "Start"}
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(25 * 60);
              setSessionType("Work");
            }}
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PomodoroTimer;
