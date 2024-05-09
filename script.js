const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipeContainer = document.querySelector(".recipe-container");
const recipeDetails = document.querySelector(".recipe-details");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");

// Function to fetch recipes based on search query
const fetchRecipes = async (query) => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
     
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.meals === null) {
      recipeContainer.innerHTML = "<h2>No recipes found.</h2>";
      return;
    }


    recipeContainer.innerHTML = "";
    data.meals.forEach((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3>${meal.strMeal}</h3>
      `;
      recipeContainer.appendChild(recipeDiv);
 
      // Add click event listener to each recipe
      recipeDiv.addEventListener("click", () => {
        displayRecipeDetails(meal);
      });
    });
  } catch (error) {
    console.error(error);
    recipeContainer.innerHTML = "<h2>An error occurred. Please try again.</h2>";
  }
};

// Function to display recipe details when a recipe is clicked
const displayRecipeDetails = (meal) => {
  const ingredients = [];
  // Collect ingredients and measurements
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  const recipeDetailsHTML = `
    <div class="recipeName">${meal.strMeal}</div>
    <div class="IngredientList">
      <strong>Ingredients:</strong>
      <ul>
        ${ingredients.map((ingredient) => `<li>${ingredient}</li>`).join("")}
      </ul>
    </div>
    <div class="recipeInstroctions">
      <strong>Instructions:</strong>
      <p>${meal.strInstructions}</p>
    </div>
  `;
  recipeDetailsContent.innerHTML = recipeDetailsHTML;

  // Display recipe details modal
  recipeDetails.style.display = "block";
};

// Close recipe details modal
recipeCloseBtn.addEventListener("click", () => {
  recipeDetails.style.display = "none";
});

// Add event listener to the search button
searchBtn.addEventListener("click", () => {
  const searchInput = searchBox.value.trim();
  if (!searchInput) {
    recipeContainer.innerHTML =
      "<h2>Please enter a meal in the search box.</h2>";
    return;
  }
  fetchRecipes(searchInput);
});

// Clear recipe container when user clicks on x button or hits enter in the search box
searchBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    recipeContainer.innerHTML = "";
  }
});


