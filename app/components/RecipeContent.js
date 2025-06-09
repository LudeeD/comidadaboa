"use client";

import React from "react";
import IngredientsList from "./IngredientsList";
import StepList from "./StepList";

export default function RecipeContent({ recipe, wakeLockComponent }) {
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
      <div className="bg-white rounded-lg px-5 py-4 shadow-sm w-full">
        <StepList 
          steps={recipe.steps} 
          onQuantitiesToggle={handleQuantitiesToggle}
          wakeLockComponent={wakeLockComponent}
        />
      </div>
    </>
  );
}