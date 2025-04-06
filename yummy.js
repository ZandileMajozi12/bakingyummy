const API_KEY = "af7c60edae1c4c9fb8f06b4d45212b2a";
const generateBtn = document.getElementById("generateBtn");
const recipeTitle = document.getElementById("recipeTitle");
const recipeImage = document.getElementById("recipeImage");
const recipeInstructions = document.getElementById("recipeInstructions");
const recipeContainer = document.getElementById("recipeContainer");

generateBtn.addEventListener("click", async () => {
  try {
    const res = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&tags=dessert`);
    const data = await res.json();
    const recipe = data.recipes[0];

    recipeTitle.textContent = recipe.title;
    recipeImage.src = recipe.image;
    recipeInstructions.innerHTML = recipe.instructions || "No instructions available.";

    recipeContainer.classList.remove("hidden");
  } catch (error) {
    alert("Failed to load recipe. Try again later.");
    console.error(error);
  }
});
