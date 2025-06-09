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
  const timers = recipe.timers;

  const formatQuantity = (quantity) => {
    if (!quantity || typeof quantity !== "object") return "";

    let value = "";
    let unit = quantity.unit || "";

    if (quantity.value && quantity.value.type === "fixed") {
      const fixedValue = quantity.value.value;
      if (fixedValue && fixedValue.type === "number") {
        const numberValue = fixedValue.value;
        if (numberValue) {
          if (numberValue.type === "regular") {
            value = numberValue.value;
          } else if (numberValue.type === "fraction") {
            const fraction = numberValue.value;
            if (fraction.whole === 0) {
              value = fraction.num / fraction.den;
            } else {
              value = fraction.whole + fraction.num / fraction.den;
            }
          }
        }
      }
    }

    // Format the value
    const formattedValue = Number(value).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    return `${formattedValue} ${unit} `;
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

    let value = "";
    let unit = timer.quantity.unit || "";

    if (timer.quantity.value?.type === "fixed") {
      const numberValue = timer.quantity.value.value?.value;
      if (numberValue?.type === "regular") {
        value = numberValue.value;
      }
    }

    return `${value} ${unit}`.trim();
  };

  const Step = ({ part }) => {
    console.log(JSON.stringify(part));
    switch (part.type) {
      case "text":
        return <span>{part.value}</span>;
      case "timer":
        let timer = timers[part.index];
        return (
          <span className="font-medium text-red-600">{formatTimer(timer)}</span>
        );
      case "ingredient":
        let ingredient = ingredients[part.index];
        return (
          <span className="font-medium text-green-600">{ingredient.name}</span>
        );
      case "cookware":
        return <span className="font-medium text-blue-600">{part.value}</span>;
      default:
        console.log("Unknown part type", part);
        return null;
    }
  };

  const Section = ({ title, steps }) => {
    return (
      <>
        <h3 className="font-semibold text-lg">{title}</h3>
        <ol className="list-decimal list-inside">
          {steps.map((step, index) => (
            <li key={index} className="mb-2">
              {Array.isArray(step.value.items)
                ? step.value.items.map((part, partIndex) => (
                    <Step key={partIndex} part={part} />
                  ))
                : step}
            </li>
          ))}
        </ol>
      </>
    );
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
              {ingredient.quantity ? formatQuantity(ingredient.quantity) : ""}
              {ingredient.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white rounded-md px-4 py-2">
        <h3 className="mb-4 font-semibold text-lg">Instruções</h3>
        {recipe.steps.map((section, index) => {
          //return JSON.stringify(section);
          return (
            <Section key={index} title={section.name} steps={section.content} />
          );
        })}
      </div>

      <MyImage slug={slug} />
    </main>
  );
}
