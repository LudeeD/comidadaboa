"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import MiniSearch from "minisearch";
import Link from "next/link";

export default function Search({ placeholder, index }) {
  const miniSearch = MiniSearch.loadJSON(index, {
    fields: ["title", "ingredients"],
  });

  const [recipes, setRecipes] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    const result = miniSearch.search(query);
    setRecipes(result);
  };

  return (
    <div className="flex flex-col">
      <div className="relative flex flex-1 flex-shrink-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div className="mt-4 flex flex-row gap-4 flex-wrap">
        {recipes.map((recipe) => (
          <Link
            key={recipe.slug}
            href={`/recipes/${recipe.slug}`}
            className="bg-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-100 ease-linear text-blue-600 hover:underline hover:cursor-none hover:bg-blue-600 hover:text-white"
          >
            {recipe.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
