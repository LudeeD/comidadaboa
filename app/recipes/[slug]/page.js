import getRecipeMetadata from "../../../utils/getRecipeMetadata";
import getPostContent from "../../../utils/getPostContent";
import Image from "next/image";
import StepList from "../../components/StepList";

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

  const ingredients = recipe.ingredients;

  const formatQuantity = (quantity, units) => {
    if (quantity === "some") return "q.b.";
    if (typeof quantity === "string") return quantity;
    if (typeof quantity === "number") {
      return units ? `${quantity} ${units}` : `${quantity}`;
    }
    return "";
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
          {recipe.metadata.title || slug.replace(/_/g, " ")}
        </h1>
        {/* Recipe metadata */}
        <div className="flex justify-center gap-4 text-sm bg-white/10 rounded-lg p-2">
          {recipe.metadata.portions && (
            <div className="flex items-center gap-1">
              <span className="font-semibold">👥</span>
              <span>{recipe.metadata.portions} porções</span>
            </div>
          )}
          {recipe.metadata.time && (
            <div className="flex items-center gap-1">
              <span className="font-semibold">⏱️</span>
              <span>{recipe.metadata.time}</span>
            </div>
          )}
          {recipe.metadata.calories && (
            <div className="flex items-center gap-1">
              <span className="font-semibold">🔥</span>
              <span>{recipe.metadata.calories}</span>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white rounded-lg px-5 py-3 shadow-sm">
        <h3 className="mb-2 font-semibold text-lg text-gray-800">Ingredientes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1">
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="flex items-baseline gap-2 py-0.5 text-base">
              <span className="text-gray-700">{ingredient.name}</span>
              <span className="text-gray-400 font-semibold text-sm">
                {formatQuantity(ingredient.quantity, ingredient.units)}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-lg px-5 py-4 shadow-sm">
        <h3 className="mb-3 font-semibold text-lg text-gray-800">Instruções</h3>
        <StepList steps={recipe.steps} />
      </div>

      <MyImage slug={slug} />
    </main>
  );
}
