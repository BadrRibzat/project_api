Project with api using JavaScript fuction That fetches recipes from an API BASED ON SEARCH QUERY.

# The code starts by selecting various elements from the HTML document using document.querySelector(). These elements include the search box, search button, recipe container, recipe details, recipe details content, and recipe close button.

# The fetchRecipes function is defined as an asynchronous function.

# It takes a query parameter, which represents the search query entered by the user.

# Inside the function, an HTTP GET request is made to the ThemealDB API using the fetch() function.

# The API endpoint is constructed with the search query.

The response from the API is checked for success using response.ok.

# If the response is not successful, an error is thrown.

# The response data is parsed as JSON using response.json().

#If the meals property in the data is null, it means no recipes were found for the search query.

# In this case, a message is displayed in the recipe container indicating that no recipes were found.

# If recipes are found, the recipe container is cleared and each recipe is dynamically created as a div element with the class "recipe".

# The recipe image, name, and other details are added to the recipe div using template literals.


# A click event listener is added to each recipe div.
 When a recipe is clicked, the displayRecipeDetails function is called with the corresponding meal object as an argument.

# The displayRecipeDetails function takes a meal object as a parameter.

# It collects the ingredients and measurements for the meal by iterating over properties with names like strIngredient1, strIngredient2, and so on.

# The ingredients and measurements are stored in an array called ingredients.

# // Function to fetch recipes

const searchBox = document.querySelector(".searchBox"); const searchBtn = document.querySelector(".searchBtn"); const recipeContainer = document.querySelector(".recipe-container"); const recipeDetails = document.querySelector(".recipe-details"); const recipeDetailsContent = document.querySelector(".recipe-details-content"); const recipeCloseBtn = document.querySelector(".recipe-close-btn");

// Function to fetch recipes based on search :
query const fetchRecipes = async (query) => { try { const response = await fetch( https://www.themealdb.com/api/json/v1/1/search.php?s=${query} );

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

# } catch (error) { console.error(error); recipeContainer.innerHTML = "An error occurred. Please try again."; } };

# // Function to display recipe details when a recipe is clicked const displayRecipeDetails = (meal) => { const ingredients = []; // Collect ingredients and measurements for (let i = 1; i <= 20; i++) { if (meal[strIngredient${i}]) { ingredients.push( ${meal[strIngredient${i}]} - ${meal[strMeasure${i}]} ); } else { break; } }

# 
