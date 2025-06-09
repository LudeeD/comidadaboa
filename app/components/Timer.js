"use client";

import React from "react";

export default function Timer({ timer, timerId, timerState, onTimerUpdate, stepText }) {
  const timeLeft = timerState?.timeLeft ?? null;
  const isActive = timerState?.isActive ?? false;
  const isFinished = timerState?.isFinished ?? false;
  const intervalRef = React.useRef(null);
  
  const totalSeconds = timer.quantity * (timer.units === "min" ? 60 : 1);
  
  const startTimer = () => {
    // Request notification permission if not already granted
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    
    onTimerUpdate(timerId, {
      timeLeft: totalSeconds,
      isActive: true,
      isFinished: false
    });
  };
  
  const dismissTimer = () => {
    onTimerUpdate(timerId, {
      timeLeft: null,
      isActive: false,
      isFinished: false
    });
  };
  
  React.useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        onTimerUpdate(timerId, (prevState) => {
          const newTimeLeft = (prevState?.timeLeft ?? 0) - 1;
          if (newTimeLeft <= 0) {
            
            // Multiple notification methods
            // 1. Browser notification (if permitted)
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("⏰ Timer Finished!", {
                body: stepText || `Your ${formatTimer(timer)} timer is done!`,
                icon: "/favicon.ico",
                tag: "cooking-timer"
              });
            }
            
            // 2. Audio notification - Web Audio API custom sound
            try {
              const audioContext = new (window.AudioContext || window.webkitAudioContext)();
              
              // Create a nice kitchen timer sound sequence
              const playTimerSound = () => {
                // First beep - higher pitch
                const osc1 = audioContext.createOscillator();
                const gain1 = audioContext.createGain();
                osc1.connect(gain1);
                gain1.connect(audioContext.destination);
                
                osc1.frequency.setValueAtTime(800, audioContext.currentTime);
                gain1.gain.setValueAtTime(0.3, audioContext.currentTime);
                gain1.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
                
                osc1.start(audioContext.currentTime);
                osc1.stop(audioContext.currentTime + 0.15);
                
                // Second beep - lower pitch
                const osc2 = audioContext.createOscillator();
                const gain2 = audioContext.createGain();
                osc2.connect(gain2);
                gain2.connect(audioContext.destination);
                
                osc2.frequency.setValueAtTime(600, audioContext.currentTime + 0.2);
                gain2.gain.setValueAtTime(0.3, audioContext.currentTime + 0.2);
                gain2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.35);
                
                osc2.start(audioContext.currentTime + 0.2);
                osc2.stop(audioContext.currentTime + 0.35);
                
                // Third beep - highest pitch
                const osc3 = audioContext.createOscillator();
                const gain3 = audioContext.createGain();
                osc3.connect(gain3);
                gain3.connect(audioContext.destination);
                
                osc3.frequency.setValueAtTime(900, audioContext.currentTime + 0.4);
                gain3.gain.setValueAtTime(0.3, audioContext.currentTime + 0.4);
                gain3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.6);
                
                osc3.start(audioContext.currentTime + 0.4);
                osc3.stop(audioContext.currentTime + 0.6);
              };
              
              playTimerSound();
              
            } catch (e) {}
            
            // 3. Visual notification (flash effect)
            document.body.style.background = "#fef3c7";
            setTimeout(() => {
              document.body.style.background = "";
            }, 300);
            
            return {
              timeLeft: 0,
              isActive: false,
              isFinished: true
            };
          }
          return {
            timeLeft: newTimeLeft,
            isActive: true,
            isFinished: false
          };
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft, timer, timerId, onTimerUpdate, stepText]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  
  const formatTimer = (timer) => {
    if (!timer || !timer.quantity) return "";
    return `${timer.quantity} ${timer.units || ""}`.trim();
  };
  
  if (isFinished) {
    return (
      <button
        onClick={dismissTimer}
        className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors bg-green-500 text-white hover:bg-green-600 animate-pulse"
      >
        ✅ Dismiss
      </button>
    );
  }

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