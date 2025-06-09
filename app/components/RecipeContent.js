"use client";

import React from "react";
import IngredientsList from "./IngredientsList";
import StepList from "./StepList";

export default function RecipeContent({ recipe }) {
  const [quantitiesMinimized, setQuantitiesMinimized] = React.useState(false);

  const handleQuantitiesToggle = (showQuantities) => {
    setQuantitiesMinimized(showQuantities);
  };

  return (
    <>
      <IngredientsList 
        ingredients={recipe.ingredients} 
        isMinimized={quantitiesMinimized} 
      />
      <div className="bg-white rounded-lg px-5 py-4 shadow-sm">
        <StepList 
          steps={recipe.steps} 
          onQuantitiesToggle={handleQuantitiesToggle}
        />
      </div>
    </>
  );
}