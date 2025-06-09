"use client";

import React from "react";

export default function WakeLock() {
  const [wakeLock, setWakeLock] = React.useState(null);
  const [isSupported, setIsSupported] = React.useState(false);

  React.useEffect(() => {
    // Check if Wake Lock API is supported
    setIsSupported("wakeLock" in navigator);
  }, []);

  const requestWakeLock = async () => {
    try {
      const wakeLockObj = await navigator.wakeLock.request("screen");
      setWakeLock(wakeLockObj);

      // Listen for wake lock release (can happen when tab becomes inactive)
      wakeLockObj.addEventListener("release", () => {
        setWakeLock(null);
      });
    } catch (err) {
      console.error("Wake lock request failed:", err);
    }
  };

  const releaseWakeLock = async () => {
    if (wakeLock) {
      await wakeLock.release();
      setWakeLock(null);
    }
  };

  // Auto-release when component unmounts or page loses visibility
  React.useEffect(() => {
    const handleVisibilityChange = () => {
      if (wakeLock && document.visibilityState === "visible") {
        // Re-request wake lock when page becomes visible again
        requestWakeLock();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (wakeLock) {
        wakeLock.release();
      }
    };
  }, [wakeLock]);

  if (!isSupported) {
    return null; // Don't show the button if not supported
  }

  return (
    <button
      onClick={wakeLock ? releaseWakeLock : requestWakeLock}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
        wakeLock
          ? "bg-green-500 text-white hover:bg-green-600"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
      title={
        wakeLock ? "Screen will stay on" : "Keep screen awake while cooking"
      }
    >
      {wakeLock ? (
        <>
          <span>🔆</span>
          <span className="hidden sm:inline">Ecrã sempre ligado</span>
          <span className="sm:hidden">Ligado</span>
        </>
      ) : (
        <>
          <span>💤</span>
          <span className="hidden sm:inline">Manter ecrã ligado</span>
          <span className="sm:hidden">Manter ligado</span>
        </>
      )}
    </button>
  );
}
