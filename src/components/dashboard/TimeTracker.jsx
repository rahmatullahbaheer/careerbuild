"use client";

import React, { useState, useEffect } from "react";
import { Pause, Play, Square } from "lucide-react";

export default function TimeTracker() {
  const [seconds, setSeconds] = useState(5048); // 01:24:08 = 3600 + 24*60 + 8 = 5048s
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="relative bg-gradient-to-br from-[#064e3b] via-[#04392b] to-[#01241a] text-white rounded-[24px] p-5 sm:p-6 shadow-md overflow-hidden flex flex-col justify-between h-full">
      {/* Background Wavy Lines Texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 400 200" fill="none">
          <path
            d="M -50 100 C 50 20, 150 180, 250 100 C 350 20, 450 180, 550 100"
            stroke="white"
            strokeWidth="12"
          />
          <path
            d="M -50 140 C 50 60, 150 220, 250 140 C 350 60, 450 220, 550 140"
            stroke="white"
            strokeWidth="8"
          />
          <path
            d="M -50 60 C 50 -20, 150 140, 250 60 C 350 -20, 450 140, 550 60"
            stroke="white"
            strokeWidth="10"
          />
        </svg>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <h3 className="text-xs font-bold text-emerald-100 tracking-wide uppercase opacity-80">
          Time Tracker
        </h3>

        {/* Digital Time Display */}
        <div className="mt-5 mb-6">
          <span className="text-3xl sm:text-4xl font-extrabold tracking-tight font-mono text-white">
            {formatTime(seconds)}
          </span>
        </div>
      </div>

      {/* Control Buttons Row */}
      <div className="relative z-10 flex items-center justify-center gap-4">
        {/* Pause / Play Button */}
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="w-11 h-11 rounded-full bg-white hover:bg-emerald-50 text-gray-900 flex items-center justify-center transition-transform active:scale-95 shadow-sm"
          aria-label={isRunning ? "Pause timer" : "Play timer"}
        >
          {isRunning ? (
            <Pause className="w-5 h-5 fill-gray-900 stroke-none" />
          ) : (
            <Play className="w-5 h-5 fill-gray-900 stroke-none ml-0.5" />
          )}
        </button>

        {/* Stop Button */}
        <button
          onClick={() => {
            setIsRunning(false);
            setSeconds(0);
          }}
          className="w-11 h-11 rounded-full bg-white hover:bg-emerald-50 flex items-center justify-center transition-transform active:scale-95 shadow-sm"
          aria-label="Stop timer"
        >
          <div className="w-5 h-5 rounded-full bg-rose-500 flex items-center justify-center">
            <Square className="w-2.5 h-2.5 fill-white text-white" />
          </div>
        </button>
      </div>
    </div>
  );
}
