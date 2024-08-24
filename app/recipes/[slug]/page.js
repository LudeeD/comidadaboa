import getRecipeMetadata from "../../../utils/getRecipeMetadata";
import getPostContent from "../../../utils/getPostContent";

export const generateStaticParams = async () => {
  const recipes = getRecipeMetadata();

  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
};

export const generateMetadata = async ({ params, searchParams }) => {
  const id = params.slug;
  return {
    title: `Recipe: ${id.replace(/-/g, " ")}`,
  };
};

export default function RecipePage(props) {
  const { params } = props;
  const { slug } = params;

  const recipe = getPostContent(slug);

  const Step = ({ part }) => {
    switch (part.type) {
      case "text":
        return <span>{part.value}</span>;
      case "ingredient":
        return (
          <span className="font-medium text-green-600">
            {part.quantity} {part.units} {part.name}
          </span>
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
        {recipe.metadata.title}
      </h1>
      <div className="bg-white rounded-md px-4 py-2">
        <h3 className="mb-2 font-semibold text-lg">Ingredientes</h3>
        <ul className="list-disc list-inside">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient.name}</li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-md px-4 py-2">
        <h3 className="mb-4 font-semibold text-lg">Instruções</h3>
        <ol className="list-decimal list-inside">
          {recipe.steps.map((step, index) => (
            <li key={index} className="mb-2">
              {Array.isArray(step)
                ? step.map((part, partIndex) => (
                    <Step key={partIndex} part={part} />
                  ))
                : step}
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
