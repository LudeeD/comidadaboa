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

  // Generate JSON-LD structured data for Google
  const generateJsonLd = () => {
    
    // Convert ingredients to schema.org format
    const recipeIngredients = recipe.ingredients.map(ingredient => {
      const quantity = ingredient.quantity === "some" ? "" : 
        typeof ingredient.quantity === "string" ? ingredient.quantity :
        typeof ingredient.quantity === "number" ? 
          (ingredient.units ? `${ingredient.quantity} ${ingredient.units}` : `${ingredient.quantity}`) : "";
      
      return quantity ? `${quantity} ${ingredient.name}`.trim() : ingredient.name;
    });

    // Convert steps to schema.org format
    const recipeInstructions = recipe.steps.map((step, index) => {
      const stepText = step
        .map(part => {
          switch (part.type) {
            case "text": return part.value;
            case "ingredient": return part.name;
            case "cookware": return part.name;
            case "timer": return `${part.quantity} ${part.units || ""}`.trim();
            default: return "";
          }
        })
        .join("")
        .trim();

      return {
        "@type": "HowToStep",
        "name": `Step ${index + 1}`,
        "text": stepText
      };
    });

    // Parse time strings (e.g., "60 min" -> "PT60M")
    const parseTime = (timeStr) => {
      if (!timeStr) return undefined;
      const match = timeStr.match(/(\d+)\s*(min|hour|hr|h)/i);
      if (match) {
        const value = match[1];
        const unit = match[2].toLowerCase();
        if (unit === 'min') return `PT${value}M`;
        if (unit === 'hour' || unit === 'hr' || unit === 'h') return `PT${value}H`;
      }
      return undefined;
    };

    const jsonLd = {
      "@context": "https://schema.org/",
      "@type": "Recipe",
      "name": recipe.metadata.title || slug.replace(/_/g, " "),
      "description": `Receita de ${recipe.metadata.title || slug.replace(/_/g, " ")}`,
      "image": image ? `/images/${slug}.jpg` : undefined,
      "author": {
        "@type": "Person",
        "name": "Comida da Boa"
      },
      "datePublished": new Date().toISOString().split('T')[0],
      "prepTime": parseTime(recipe.metadata.time),
      "cookTime": parseTime(recipe.metadata.time),
      "totalTime": parseTime(recipe.metadata.time),
      "recipeYield": recipe.metadata.portions || "2",
      "recipeCategory": "Main Course",
      "recipeCuisine": "Portuguese",
      "nutrition": recipe.metadata.calories ? {
        "@type": "NutritionInformation",
        "calories": recipe.metadata.calories
      } : undefined,
      "recipeIngredient": recipeIngredients,
      "recipeInstructions": recipeInstructions
    };

    // Remove undefined values
    Object.keys(jsonLd).forEach(key => {
      if (jsonLd[key] === undefined) {
        delete jsonLd[key];
      }
    });

    return JSON.stringify(jsonLd, null, 2);
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
    <>
      {/* JSON-LD structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: generateJsonLd() }}
      />
      
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
    </>
  );
}
