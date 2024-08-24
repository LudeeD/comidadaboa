import fs from "fs";
import { Recipe } from "@cooklang/cooklang-ts";

export default function getRecipeMetadata() {
  const files = fs.readdirSync(`${process.cwd()}/recipes`, "utf-8");
  const recipes = files
    .filter((fn) => fn.endsWith(".md"))
    .map((fn) => {
      const path = `${process.cwd()}/recipes/${fn}`;
      const rawContent = fs.readFileSync(path, {
        encoding: "utf-8",
      });

      let recipe = new Recipe(rawContent);

      console.log(recipe.metadata);

      return { slug: fn.replace(/\.md$/, ""), ...recipe.metadata };
    });

  console.log(recipes);
  return recipes;
}
