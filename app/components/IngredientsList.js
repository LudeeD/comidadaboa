"use client";

import React from "react";

export default function IngredientsList({ ingredients, isMinimized }) {
  const formatQuantity = (quantity, units) => {
    if (quantity === "some") return "q.b.";
    if (typeof quantity === "string") return quantity;
    if (typeof quantity === "number") {
      return units ? `${quantity} ${units}` : `${quantity}`;
    }
    return "";
  };

  return (
    <div className="bg-white rounded-lg px-5 py-3 shadow-sm">
      <h3 className="mb-2 font-semibold text-lg text-gray-800">Ingredientes</h3>
      {isMinimized ? (
        <p className="text-sm text-gray-500 italic">
          Quantidades mostradas nas instruções
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-baseline gap-2 py-0.5 text-base">
              <span className="text-gray-700">{ingredient.name}</span>
              <span className="text-gray-400 font-semibold text-sm">
                {formatQuantity(ingredient.quantity, ingredient.units)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}