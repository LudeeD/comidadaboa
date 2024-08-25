import getRecipeMetadata from "../../../utils/getRecipeMetadata";
import getPostContent from "../../../utils/getPostContent";
import Image from "next/image";

export const generateStaticParams = async () => {
  const recipes = getRecipeMetadata();

  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
};

export const generateMetadata = async ({ params, searchParams }) => {
  const id = params.slug;
  return {
    title: `Receita: ${id.replace(/-/g, " ")}`,
  };
};

export default function RecipePage(props) {
  const { params } = props;
  const { slug } = params;

  const { recipe, image } = getPostContent(slug);

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

  const Step = ({ part }) => {
    switch (part.type) {
      case "text":
        return <span>{part.value}</span>;
      case "timer":
        return (
          <span className="font-medium text-red-600">
            {part.quantity} {part.units}
          </span>
        );
      case "ingredient":
        return <span className="font-medium text-green-600">{part.name}</span>;
      case "cookware":
        return <span className="font-medium text-blue-600">{part.name}</span>;
      default:
        console.log("Unknown part type", part);
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
            <li key={index}>
              {ingredient.quantity == "some" ? "" : ingredient.quantity}{" "}
              {ingredient.units} {ingredient.name}
            </li>
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

      <MyImage slug={slug} />
    </main>
  );
}
