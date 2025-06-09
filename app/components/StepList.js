"use client";

import React from "react";
import Timer from "./Timer";

export default function StepList({ steps }) {
  const [completedSteps, setCompletedSteps] = React.useState(new Set());

  const toggleStep = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepIndex)) {
      newCompleted.delete(stepIndex);
    } else {
      newCompleted.add(stepIndex);
    }
    setCompletedSteps(newCompleted);
  };

  const StepPart = ({ part }) => {
    switch (part.type) {
      case "text":
        return <span>{part.value}</span>;
      case "timer":
        return <Timer timer={part} />;
      case "ingredient":
        return (
          <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
            {part.name}
          </span>
        );
      case "cookware":
        return (
          <span className="font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
            {part.name}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <ul className="space-y-3">
      {steps.map((step, stepIndex) => {
        const isCompleted = completedSteps.has(stepIndex);
        return (
          <li key={stepIndex} className="flex items-start gap-3">
            <button
              onClick={() => toggleStep(stepIndex)}
              className={`flex-shrink-0 w-5 h-5 rounded border-2 mt-0.5 transition-colors ${
                isCompleted
                  ? "bg-amber-500 border-amber-500 text-white"
                  : "border-gray-300 hover:border-amber-400"
              }`}
            >
              {isCompleted && (
                <svg
                  className="w-3 h-3 mx-auto"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
            <div
              className={`text-base leading-relaxed transition-opacity ${
                isCompleted ? "opacity-50" : ""
              }`}
              style={isCompleted ? { textDecoration: "line-through", textDecorationThickness: "2px" } : {}}
            >
              {step.map((part, partIndex) => (
                <StepPart key={partIndex} part={part} />
              ))}
            </div>
          </li>
        );
      })}
    </ul>
  );
}