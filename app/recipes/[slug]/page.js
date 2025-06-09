import getRecipeMetadata from "../../../utils/getRecipeMetadata";
import getPostContent from "../../../utils/getPostContent";
import Image from "next/image";
import RecipeContent from "../../components/RecipeContent";

export const generateStaticParams = async () => {
  const recipes = getRecipeMetadata();

  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
};

export const generateMetadata = async (props) => {
  const params = await props.params;
  const id = params.slug;
  return {
    title: `Receita: ${id.replace(/-/g, " ")}`,
  };
};

export default async function RecipePage(props) {
  const params = await props.params;
  const { slug } = params;

  const { recipe, image } = await getPostContent(slug);
  
  // Serialize the recipe data for client components
  const recipeData = {
    ingredients: recipe.ingredients,
    steps: recipe.steps,
    metadata: recipe.metadata
  };

  // return if exists
  const MyImage = ({ slug }) => {
    if (!image) {
      return null;
    } else {
      return (
        <Image
          className="rounded-lg mx-auto"
          src={`/images/${slug}.jpg`}
          alt="Se estás a ler isto é porque não estás a ver a imagem da comida"
          width={600}
          height={600}
          unoptimized={true}
        />
      );
    }
  };

  const formatTimer = (timer) => {
    if (!timer || !timer.quantity) return "";
    return `${timer.quantity} ${timer.units || ""}`.trim();
  };



  return (
    <main className="bg-red text-lg flex flex-col gap-5 max-w-4xl mx-auto p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">
          {recipeData.metadata.title || slug.replace(/_/g, " ")}
        </h1>
        {/* Recipe metadata */}
        <div className="flex justify-center gap-4 text-sm bg-white/10 rounded-lg p-2">
          {recipeData.metadata.portions && (
            <div className="flex items-center gap-1">
              <span className="font-semibold">👥</span>
              <span>{recipeData.metadata.portions} porções</span>
            </div>
          )}
          {recipeData.metadata.time && (
            <div className="flex items-center gap-1">
              <span className="font-semibold">⏱️</span>
              <span>{recipeData.metadata.time}</span>
            </div>
          )}
          {recipeData.metadata.calories && (
            <div className="flex items-center gap-1">
              <span className="font-semibold">🔥</span>
              <span>{recipeData.metadata.calories}</span>
            </div>
          )}
        </div>
      </div>
      <RecipeContent recipe={recipeData} />

      <MyImage slug={slug} />
    </main>
  );
}
