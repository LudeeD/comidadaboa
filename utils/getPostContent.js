import fs from "fs";
import { Recipe } from "@cooklang/cooklang-ts";

export default function getPostContent(slug) {
  const path = `${process.cwd()}/recipes/${slug}.cook`;
  const rawContent = fs.readFileSync(path, {
    encoding: "utf-8",
  });

  const path_image = `${process.cwd()}/public/images/${slug}.jpg`;

  let image = fs.existsSync(path_image);

  const ret = {
    recipe: new Recipe(rawContent),
    image: image,
  };

  return ret;
}
