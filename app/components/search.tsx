"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import MiniSearch from "minisearch";

export default function Search({ placeholder, index }) {
  const miniSearch = MiniSearch.loadJSON(index, { fields: ["title", "text"] });

  const [recipes, setRecipes] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    console.log(query);
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
          //defaultValue={searchParams.get("query")?.toString()}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
      <div>{JSON.stringify(recipes)}</div>
    </div>
  );
}
