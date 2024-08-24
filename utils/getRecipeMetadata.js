import fs from "fs";
import { Recipe } from "@cooklang/cooklang-ts";

export default function getRecipeMetadata() {
  const files = fs.readdirSync(`${process.cwd()}/recipes`, "utf-8");
  let id = 0;
  const recipes = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => {
      const path = `${process.cwd()}/recipes/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });

      let recipe = new Recipe(rawContent);

      let ingredients_to_index = recipe.ingredients.map((ingredient) => {
        return ingredient.name;
      });

      id += 1;
      return {
        id: id,
        slug: fn.replace(/\.md$/, ""),
        ...recipe.metadata,
        ingredients: ingredients_to_index.join(", "),
      };
    });

  return recipes;
}
