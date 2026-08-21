"use client";

import React from "react";

export default function ProjectProgress() {
  return (
    <div className="bg-white border border-gray-100/80 rounded-[24px] p-5 sm:p-6 shadow-2xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="mb-2">
        <h3 className="text-sm font-bold text-gray-900 tracking-wide">
          ATS Optimization
        </h3>
      </div>

      {/* Donut Gauge Chart Container */}
      <div className="relative flex flex-col items-center justify-center py-4">
        <svg className="w-[180px] h-[100px]" viewBox="0 0 200 110">
          <defs>
            <pattern
              id="gauge-hatch"
              width="6"
              height="6"
              patternTransform="rotate(45 0 0)"
              patternUnits="userSpaceOnUse"
            >
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="6"
                stroke="#6b7280"
                strokeWidth="2"
              />
            </pattern>
          </defs>

          {/* Background Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="24"
            strokeLinecap="round"
          />

          {/* Hatched Pending Arc */}
          <path
            d="M 130 32 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#gauge-hatch)"
            strokeWidth="24"
            strokeLinecap="round"
          />

          {/* Solid Green Completed Arc (41%) */}
          <path
            d="M 20 100 A 80 80 0 0 1 145 42"
            fill="none"
            stroke="#064e3b"
            strokeWidth="24"
            strokeLinecap="round"
          />
        </svg>

        {/* Center Percentage Callout */}
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <span className="text-3xl font-extrabold text-gray-900 tracking-tight block">
            41%
          </span>
          <span className="text-[10px] font-semibold text-gray-400 block -mt-1">
            ATS Optimized
          </span>
        </div>
      </div>

      {/* Legend Footer */}
      <div className="flex items-center justify-center gap-4 text-[10px] font-semibold text-gray-600 pt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#064e3b]"></span>
          <span>ATS Passed</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]"></span>
          <span>In Review</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-gray-300 border border-gray-400"></span>
          <span>Needs Work</span>
        </div>
      </div>
    </div>
  );
}
