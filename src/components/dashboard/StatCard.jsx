"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Rocket, Clock, CheckCircle2, Sparkles, X } from "lucide-react";

export default function StatCard({
  title,
  description = "Build and optimize your documents.",
  count,
  subtitle,
  badgeText,
  gradient = "from-[#064e3b] via-[#04392b] to-[#022c22]",
  shadowColor = "shadow-emerald-950/20",
  status = "launch", // "launch" or "soon"
  onLaunch = () => {},
  details = {
    description: "Detailed performance breakdown and optimization metrics.",
    items: [
      "Real-time document optimization",
      "95% ATS Compatibility Score",
      "Export ready PDF & DOCX",
    ],
  },
  index = 0,
}) {
  const [showModal, setShowModal] = useState(false);

  const isLaunch = status === "launch";

  return (
    <>
      {/* Framer Motion Stat Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={`relative p-5 sm:p-6 rounded-[24px] bg-gradient-to-br ${gradient} text-white shadow-lg ${shadowColor} border border-white/15 overflow-hidden group flex flex-col justify-between h-full`}
      >
        {/* Floating Animated Background Bubbles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Bubble 1 - Top Right */}
          <motion.div
            animate={{
              y: [0, -18, 0],
              x: [0, 12, 0],
              scale: [1, 1.25, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -right-4 -top-4 w-24 h-24 bg-white/15 rounded-full blur-md"
          />

          {/* Bubble 2 - Bottom Left */}
          <motion.div
            animate={{
              y: [0, 16, 0],
              x: [0, -14, 0],
              scale: [1, 1.18, 1],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -left-6 -bottom-6 w-28 h-28 bg-white/10 rounded-full blur-md"
          />

          {/* Bubble 3 - Center Pulse */}
          <motion.div
            animate={{
              scale: [0.9, 1.3, 0.9],
              opacity: [0.1, 0.25, 0.1],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/10 rounded-full blur-xl"
          />
        </div>

        {/* Card Header & Title */}
        <div className="relative z-10 space-y-2 mb-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-white/90">
              {title}
            </span>

            {badgeText && (
              <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-[9px] border border-white/25 shadow-2xs">
                {badgeText}
              </span>
            )}
          </div>

          {/* Metric Counter */}
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-sans drop-shadow-xs">
            {count}
          </h2>

          {/* Short Description */}
          <p className="text-[11px] font-medium text-white/80 leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Card Footer: Subtitle + Action Button (Launch / Soon) */}
        <div className="relative z-10 flex items-center justify-between gap-2 pt-3 border-t border-white/15">
          <span className="text-[10px] font-medium text-white/70">
            {subtitle}
          </span>

          {/* Launch vs Soon Button */}
          {isLaunch ? (
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => {
                e.stopPropagation();
                onLaunch();
                setShowModal(true);
              }}
              className="py-1.5 px-3 rounded-full bg-white text-gray-900 font-bold text-[11px] hover:bg-emerald-50 transition-all shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Rocket className="w-3 h-3 text-[#064e3b]" />
              <span>Launch</span>
            </motion.button>
          ) : (
            <div className="py-1.5 px-3 rounded-full bg-white/20 backdrop-blur-md text-white/90 font-bold text-[11px] border border-white/25 shadow-2xs flex items-center gap-1.5 cursor-not-allowed">
              <Clock className="w-3 h-3 text-amber-300" />
              <span>Soon</span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Framer Motion AnimatePresence Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-gray-100 space-y-5 z-10"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${gradient} text-white flex items-center justify-center font-bold shadow-xs`}>
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-gray-900 leading-tight">
                      {title} Feature Launched
                    </h3>
                    <span className="text-xs text-emerald-700 font-semibold">
                      Metric: {count}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                {details.description}
              </p>

              <div className="space-y-2.5 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                {details.items.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-2.5 text-xs text-gray-800 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="py-2.5 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition-all"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    alert(`Launching ${title} tool...`);
                    setShowModal(false);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-[#064e3b] hover:bg-[#04392b] text-white font-semibold text-xs transition-all shadow-xs"
                >
                  Open Tool
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
