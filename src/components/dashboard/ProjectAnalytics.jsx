"use client";

import React from "react";

export default function ProjectAnalytics() {
  const bars = [
    { day: "S", height: "65%", type: "hatched" },
    { day: "M", height: "85%", type: "solid-dark" },
    { day: "T", height: "74%", type: "mint", badge: "74%" },
    { day: "W", height: "95%", type: "solid-dark" },
    { day: "T", height: "70%", type: "hatched" },
    { day: "F", height: "60%", type: "hatched" },
    { day: "S", height: "75%", type: "hatched" },
  ];

  return (
    <div className="bg-white border border-gray-100/80 rounded-[24px] p-5 sm:p-6 shadow-2xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-900 tracking-wide">
          Resume Analytics
        </h3>
      </div>

      {/* Custom Bar Chart Container */}
      <div className="flex items-end justify-between gap-2 sm:gap-3 h-[150px] pt-6 pb-2 px-1">
        {bars.map((bar, index) => (
          <div
            key={index}
            className="flex-1 flex flex-col items-center justify-end h-full gap-2 relative group"
          >
            {/* Percentage Callout Badge */}
            {bar.badge && (
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded-full bg-white border border-gray-200 text-[9px] font-bold text-gray-700 shadow-xs z-10">
                {bar.badge}
              </div>
            )}

            {/* Pill Bar */}
            <div
              className="w-full max-w-[34px] rounded-full transition-all duration-300 relative overflow-hidden"
              style={{ height: bar.height }}
            >
              {bar.type === "solid-dark" && (
                <div className="w-full h-full bg-[#064e3b] rounded-full" />
              )}

              {bar.type === "mint" && (
                <div className="w-full h-full bg-[#34d399] rounded-full" />
              )}

              {bar.type === "hatched" && (
                <div className="w-full h-full bg-gray-100 rounded-full border border-gray-200 relative">
                  <svg
                    className="w-full h-full text-gray-300 opacity-60"
                    width="100%"
                    height="100%"
                  >
                    <defs>
                      <pattern
                        id={`hatch-${index}`}
                        width="8"
                        height="8"
                        patternTransform="rotate(45 0 0)"
                        patternUnits="userSpaceOnUse"
                      >
                        <line
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="8"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        />
                      </pattern>
                    </defs>
                    <rect
                      width="100%"
                      height="100%"
                      fill={`url(#hatch-${index})`}
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Day Label */}
            <span className="text-[11px] font-semibold text-gray-400">
              {bar.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
