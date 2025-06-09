"use client";

import React from "react";
import Timer from "./Timer";

export default function StepList({
  steps,
  onQuantitiesToggle,
  wakeLockComponent,
}) {
  const [completedSteps, setCompletedSteps] = React.useState(new Set());
  const [showQuantities, setShowQuantities] = React.useState(false);
  const [timerStates, setTimerStates] = React.useState({});

  const handleToggleQuantities = () => {
    const newState = !showQuantities;
    setShowQuantities(newState);
    onQuantitiesToggle(newState);
  };

  const handleTimerUpdate = (timerId, updateFn) => {
    setTimerStates((prev) => ({
      ...prev,
      [timerId]:
        typeof updateFn === "function" ? updateFn(prev[timerId]) : updateFn,
    }));
  };

  const toggleStep = (stepIndex) => {
    const newCompleted = new Set(completedSteps);
    if (newCompleted.has(stepIndex)) {
      newCompleted.delete(stepIndex);
    } else {
      newCompleted.add(stepIndex);
    }
    setCompletedSteps(newCompleted);
  };

  const StepPart = ({ part, stepIndex, partIndex, stepText }) => {
    switch (part.type) {
      case "text":
        return <span>{part.value}</span>;
      case "timer":
        const timerId = `${stepIndex}-${partIndex}`;
        return (
          <Timer
            timer={part}
            timerId={timerId}
            timerState={timerStates[timerId]}
            onTimerUpdate={handleTimerUpdate}
            stepText={stepText}
          />
        );
      case "ingredient":
        const formatQuantity = (quantity, units) => {
          if (quantity === "some") return "q.b.";
          if (typeof quantity === "string") return quantity;
          if (typeof quantity === "number") {
            return units ? `${quantity} ${units}` : `${quantity}`;
          }
          return "";
        };

        return (
          <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded">
            {part.name}
            {showQuantities && part.quantity && (
              <span className="text-green-500 text-xs ml-1">
                ({formatQuantity(part.quantity, part.units)})
              </span>
            )}
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
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
        <h3 className="font-semibold text-lg text-gray-800">Instruções</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {wakeLockComponent}
          <button
            onClick={handleToggleQuantities}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            {showQuantities ? (
              <>
                <span>🫣</span>
                <span className="hidden sm:inline">Modo normal</span>
                <span className="sm:hidden">Normal</span>
              </>
            ) : (
              <>
                <span>👀</span>
                <span className="hidden sm:inline">Modo compacto</span>
                <span className="sm:hidden">Compacto</span>
              </>
            )}
          </button>
        </div>
      </div>
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
                style={
                  isCompleted
                    ? {
                        textDecoration: "line-through",
                        textDecorationThickness: "2px",
                      }
                    : {}
                }
              >
                {step.map((part, partIndex) => {
                  // Create complete step text for context
                  const stepText = step
                    .map((p) => {
                      switch (p.type) {
                        case "text":
                          return p.value;
                        case "ingredient":
                          return p.name;
                        case "cookware":
                          return p.name;
                        case "timer":
                          return `${p.quantity} ${p.units || ""}`.trim();
                        default:
                          return "";
                      }
                    })
                    .join("")
                    .trim();

                  return (
                    <StepPart
                      key={partIndex}
                      part={part}
                      stepIndex={stepIndex}
                      partIndex={partIndex}
                      stepText={stepText}
                    />
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
