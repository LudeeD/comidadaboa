"use client";

import React from "react";
import Timer from "./Timer";

export default function StepList({ steps, onQuantitiesToggle }) {
  const [completedSteps, setCompletedSteps] = React.useState(new Set());
  const [showQuantities, setShowQuantities] = React.useState(false);
  
  const handleToggleQuantities = () => {
    const newState = !showQuantities;
    setShowQuantities(newState);
    onQuantitiesToggle(newState);
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

  const StepPart = ({ part }) => {
    switch (part.type) {
      case "text":
        return <span>{part.value}</span>;
      case "timer":
        return <Timer timer={part} />;
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
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-lg text-gray-800">Instruções</h3>
        <button
          onClick={handleToggleQuantities}
          className="px-3 py-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors flex items-center gap-1.5 font-medium"
        >
          <span>{showQuantities ? "Esconder" : "Mostrar"} qtd.</span>
          <svg
            className={`w-3 h-3 transition-transform ${showQuantities ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
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
    </div>
  );
}