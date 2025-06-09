"use client";

import React from "react";

export default function Timer({ timer }) {
  const [timeLeft, setTimeLeft] = React.useState(null);
  const [isActive, setIsActive] = React.useState(false);
  const intervalRef = React.useRef(null);
  
  const totalSeconds = timer.quantity * (timer.units === "min" ? 60 : 1);
  
  const startTimer = () => {
    setTimeLeft(totalSeconds);
    setIsActive(true);
  };
  
  React.useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsActive(false);
            alert("⏰ Timer finished!");
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  
  const formatTimer = (timer) => {
    if (!timer || !timer.quantity) return "";
    return `${timer.quantity} ${timer.units || ""}`.trim();
  };
  
  return (
    <button
      onClick={startTimer}
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
        isActive
          ? "bg-red-100 text-red-700 border-2 border-red-300"
          : "bg-red-500 text-white hover:bg-red-600"
      }`}
    >
      ⏱️ {isActive ? formatTime(timeLeft) : formatTimer(timer)}
    </button>
  );
}