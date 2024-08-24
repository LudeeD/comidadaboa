import Image from "next/image";
import getRecipeMetadata from "../utils/getRecipeMetadata";
import Link from "next/link";
import Search from "./components/search";
import MiniSearch from "minisearch";

export default function Home() {
  const recipes = getRecipeMetadata();

  // A collection of documents for our examples
  const documents = [
    {
      id: 1,
      title: "Moby Dick",
      text: "Call me Ishmael. Some years ago...",
      category: "fiction",
    },
    {
      id: 2,
      title: "Zen and the Art of Motorcycle Maintenance",
      text: "I can see by my watch...",
      category: "fiction",
    },
    {
      id: 3,
      title: "Neuromancer",
      text: "The sky above the port was...",
      category: "fiction",
    },
    {
      id: 4,
      title: "Zen and the Art of Archery",
      text: "At first sight it must seem...",
      category: "non-fiction",
    },
  ];

  let miniSearch = new MiniSearch({
    fields: ["title", "text"], // fields to index for full-text search
    storeFields: ["title", "category"], // fields to return with search results
  });

  miniSearch.addAll(documents);

  let miniSearchJson = JSON.stringify(miniSearch);

  console.log("recipes" + JSON.stringify(recipes));

  //const [filteredRecipes, setFilteredRecipes] = useState(recipes);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center font-bold mb-8">Comida da boa</h1>

      <Search index={miniSearchJson} />

      <WeeklySuggestions suggestions={recipes} />

      <section>
        <h2 className="text-xl font-semibold mb-4">All Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.slug}
              className="flex flex-col items-center p-4 border rounded-lg"
            >
              <Link
                href={`/recipes/${recipe.slug}`}
                className="text-blue-600 hover:underline"
              >
                {recipe.title}
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

const WeeklySuggestions = ({ suggestions }) => (
  <section className="my-8">
    <h2 className="text-xl font-semibold mb-4">Weekly Suggestions</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
      {suggestions.map((recipe) => (
        <div key={recipe.slug} className="flex flex-col items-center">
          <Link
            href={`/recipes/${recipe.slug}`}
            className="text-blue-600 hover:underline"
          >
            {recipe.title}
          </Link>
        </div>
      ))}
    </div>
  </section>
);
