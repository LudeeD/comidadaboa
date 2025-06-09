import fs from "fs";
import path from "path";
import { Recipe, Parser, getImageURL } from "@cooklang/cooklang-ts";

export default async function getPostContent(slug) {
  const filePath = path.join(process.cwd(), "recipes", `${slug}.cook`);
  const filePathImage = path.join(
    process.cwd(),
    "public",
    "images",
    `${slug}.jpg`,
  );
  const rawContent = fs.readFileSync(filePath, "utf-8");

  const value = new Recipe(rawContent);

  return { recipe: value, image: fs.existsSync(filePathImage) };
}
