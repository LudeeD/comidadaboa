import getRecipeMetadata from "../../../utils/getRecipeMetadata";
import getPostContent from "../../../utils/getPostContent";
import Image from "next/image";

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
    if (quantity === "some") return "";
    if (typeof quantity === "string") return quantity + " ";
    if (typeof quantity === "number") {
      return units ? `${quantity} ${units} ` : `${quantity} `;
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

  const StepPart = ({ part }) => {
    switch (part.type) {
      case "text":
        return <span>{part.value}</span>;
      case "timer":
        return (
          <span className="font-medium text-red-600">
            {formatTimer(part)}
          </span>
        );
      case "ingredient":
        return (
          <span className="font-medium text-green-600">{part.name}</span>
        );
      case "cookware":
        return <span className="font-medium text-blue-600">{part.name}</span>;
      default:
        return null;
    }
  };


  return (
    <main className="bg-red text-lg flex flex-col gap-4">
      <h1 className="text-2xl text-center font-bold">
        {recipe.metadata.title || slug.replace(/_/g, " ")}
      </h1>
      <div className="bg-white rounded-md px-4 py-2">
        <h3 className="mb-2 font-semibold text-lg">Ingredientes</h3>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {formatQuantity(ingredient.quantity, ingredient.units)}
              {ingredient.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-md px-4 py-2">
        <h3 className="mb-4 font-semibold text-lg">Instruções</h3>
        <ol className="list-decimal list-inside">
          {recipe.steps.map((step, stepIndex) => (
            <li key={stepIndex} className="mb-2">
              {step.map((part, partIndex) => (
                <StepPart key={partIndex} part={part} />
              ))}
            </li>
          ))}
        </ol>
      </div>

      <MyImage slug={slug} />
    </main>
  );
}
