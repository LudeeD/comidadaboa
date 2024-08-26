import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the JS file from the pkg directory
import initWasm, * as wasm from "../cooklang/cooklang_playground.js";

let initialized = false;

export default async function getPostContent(slug) {
  if (!initialized) {
    // Initialize the WASM module
    const wasmPath = path.join(
      __dirname,
      "..",
      "cooklang",
      "cooklang_playground_bg.wasm",
    );
    await initWasm(fs.readFileSync(wasmPath));
    initialized = true;
  }

  // Now you can use the imported functions
  const state = new wasm.State();
  console.log("CookLang version:", wasm.version());

  const filePath = path.join(process.cwd(), "recipes", `${slug}.cook`);
  const filePathImage = path.join(
    process.cwd(),
    "public",
    "images",
    `${slug}.jpg`,
  );
  const rawContent = fs.readFileSync(filePath, "utf-8");

  const { value, error } = state.parse_full(rawContent, true);

  console.log("Errors:", error);

  return { recipe: JSON.parse(value), image: fs.existsSync(filePathImage) };
}
