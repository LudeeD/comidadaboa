import fs from "fs";
import { Recipe } from "@cooklang/cooklang-ts";

export default function getPostContent(slug) {
  const path = `${process.cwd()}/recipes/${slug}.md`;
  const rawContent = fs.readFileSync(path, {
    encoding: "utf-8",
  });

  return new Recipe(rawContent);
}
