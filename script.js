const API_KEY = "1e31ef6a9a8147f999bd3852df612ca4";
const searchBtn = document.getElementById("searchBtn");
const ingredientsInput = document.getElementById("ingredientsInput");
const recipesContainer = document.getElementById("recipesContainer");

searchBtn.addEventListener("click", async () => {
  const ingredients = ingredientsInput.value.trim();
  if (!ingredients) {
    alert("Please enter some ingredients.");
    return;
  }

  try {
    recipesContainer.innerHTML = "<p>Loading recipes...</p>";

    const response = await fetch(
      `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(
        ingredients
      )}&number=5&ranking=1&ignorePantry=true&apiKey=${API_KEY}`
    );

    const data = await response.json();
    recipesContainer.innerHTML = "";

    if (data.length === 0) {
      recipesContainer.innerHTML = "<p>No recipes found for those ingredients.</p>";
      return;
    }

    for (let recipe of data) {
      const recipeDetailsResponse = await fetch(
        `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${API_KEY}`
      );
      const recipeDetails = await recipeDetailsResponse.json();

      const recipeEl = document.createElement("div");
      recipeEl.classList.add("recipe-card");
      recipeEl.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <p>${recipeDetails.summary?.replace(/<[^>]*>/g, '').slice(0, 200)}...</p>
        <a href="${recipeDetails.sourceUrl}" target="_blank">View Full Recipe</a>
      `;
      recipesContainer.appendChild(recipeEl);
    }
  } catch (error) {
    console.error(error);
    recipesContainer.innerHTML = "<p>Something went wrong. Please try again.</p>";
  }
});
