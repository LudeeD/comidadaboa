import Image from "next/image";
import getRecipeMetadata from "../utils/getRecipeMetadata";
import Link from "next/link";
import Search from "./components/search";
import MiniSearch from "minisearch";

function getRandom(arr, n) {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

export default function Home() {
  const recipes = getRecipeMetadata();

  let miniSearch = new MiniSearch({
    fields: ["title", "ingredients"], // fields to index for full-text search
    storeFields: ["title", "slug"], // fields to return with search results
  });

  miniSearch.addAll(recipes);

  let miniSearchJson = JSON.stringify(miniSearch);

  //const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  let random_suggestions = getRandom(recipes, 1);

  return (
    <main className="container mx-auto px-4 py-8 text-xl flex flex-col gap-8">
      <Search index={miniSearchJson} />

      <WeeklySuggestions suggestions={random_suggestions} />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Todas as receitas</h2>
        <section className="bg-white rounded-lg py-2 px-4 overflow-auto">
          <ul className="list-disc list-inside leading-10">
            {recipes.map((recipe) => (
              <li key={recipe.slug}>
                <Link
                  href={`/recipes/${recipe.slug}`}
                  className="text-blue-600 hover:underline"
                >
                  {recipe.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

const WeeklySuggestions = ({ suggestions }) => (
  <div>
    <h2 className="text-2xl font-semibold ">Sugestões</h2>
    <section className="py-2 overflow-auto">
      <div className="flex flex-row gap-4 flex-wrap">
        {suggestions.map((recipe) => (
          <Link
            key={recipe.slug}
            href={`/recipes/${recipe.slug}`}
            className="bg-white py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition duration-100 ease-linear text-blue-600 hover:underline hover:cursor-none hover:bg-blue-600 hover:text-white"
          >
            {recipe.title}
          </Link>
        ))}
      </div>
    </section>
  </div>
);
