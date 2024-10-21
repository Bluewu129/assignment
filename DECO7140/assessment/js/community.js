import { submitRecipeForm, fetchRecipes } from './components.js'

// addIngredient area start
function addIngredient() {
    console.log('add a new ingredient');
    const container = document.getElementById('ingredients-container');
    const newIngredientGroup = document.createElement('div');
    newIngredientGroup.classList.add('ingredient-group');

    newIngredientGroup.innerHTML = `
<input type="text" class="ingredient-name" placeholder="Ingredient Name"
required>
<input type="text" class="ingredient-quantity" placeholder="Quantity" required>
<button type="button" class="remove-ingredient-btn">Remove</button>
`;
    container.appendChild(newIngredientGroup);
    // Attach an event listener to the new "Remove" button
    newIngredientGroup.querySelector('.remove-ingredient-btn').addEventListener('click', removeIngredient);
}

// Function to remove an ingredient group from the form
function removeIngredient(event) {
    const button = event.target; // get the button that has been clicked
    const ingredientGroup = button.parentElement; // get the parent of the button
    ingredientGroup.remove(); // remove the whole parent element
}
// addIngredient area end

// post message handle start
// Define success and error handlers
function handleSuccess(result) {
    const messageDiv = document.getElementById('submitResponse');
    messageDiv.textContent = `Thanks! ${result.recipe_name} was submitted successfully!`;
    messageDiv.style.color = "green";

    // Reset the form after success
    document.getElementById('recipeForm').reset();
    loadRecipes();
}

function handleError(error) {
    const messageDiv = document.getElementById('submitResponse');
    messageDiv.textContent = "There was a problem submitting your recipe. Please try again: " + error;
    messageDiv.style.color = "red";
}

// post message handle end


// get handle start

function displayRecipes(data) {
    let output = ""; // Initialize a variable to store HTML
    // Loop through each recipe in the response data
    data.forEach(recipe => {
        console.log(recipe); // For debugging
        // Check if the recipe has an image, otherwise use the placeholder
        const recipeImage = recipe.image
            ? recipe.image
            : "media/icons8-spam-can-480.png"; // Use placeholder if no image
        // Build the ingredients list as a string
        const ingredientsList = recipe.ingredients.map(ingredient =>
            `<li>${ingredient.name}: ${ingredient.quantity}</li>`).join('');
        output += `
        <div class="recipe-card" role="article" aria-labelledby="recipe-${recipe.id}-name" aria-describedby="recipe-${recipe.id}-description">
            <div class="post">
               <img src="${recipeImage}" alt="Image of ${recipe.recipe_name}" class="avatar">
                <div class="content">
                    <div class="username">Recipe Name:${recipe.recipe_name}</div>
                    <div class="timestamp">${recipe.created_at}</div>
                    <div class="message">
                        <p aria-label="Author: ${recipe.author}"><strong class="community-subtitle">Author</strong>:${recipe.author}</p>
                        <p aria-label="Difficulty Level: ${recipe.difficulty_level}"><strong class="community-subtitle">Difficulty</strong>: ${recipe.difficulty_level}</p>
                        <p aria-label="Servings:${recipe.servings}"><strong class="community-subtitle">Servings</strong>: ${recipe.servings}</p>
                        <p aria-label="Cooking time:${recipe.cooking_time} minutes"><strong class="community-subtitle">Cooking time</strong>: ${recipe.cooking_time} mins</p>
                        <p><strong class="community-subtitle">Ingredients:</strong></p>
                        <ul aria-label="List of ingredients">
                        ${ingredientsList}
                        </ul>
                        <p><strong class="community-subtitle">Instructions:</strong></p>
                            <p class="recipe-instructions" aria-label="Instructions for${recipe.recipe_name}">${recipe.instructions}</p>
                    </div>
                </div>
            </div>
        </div>
`;
    });
    // Display the dynamically created HTML in the specified section of the webpage
    document.getElementById('recipes-container').innerHTML = output;
}
// Recipes FETCH GET error handler function
function handleGETError(error) {
    console.error('Error fetching recipes:', error);
    document.getElementById('recipes-container').innerHTML = `<p>Failed to load
    recipes. Please try again later.</p>`;
}

// get  handle start

// Listener for recipes  
document.addEventListener('DOMContentLoaded', function () {

    // Select the "Add Ingredient" button and attach the event listener
    const addIngredientBtn = document.getElementById('add-ingredient-btn');
    addIngredientBtn.addEventListener('click', addIngredient);
    // Attach event listeners to the existing "Remove" buttons
    document.querySelectorAll('.remove-ingredient-btn').forEach(button => {
        button.addEventListener('click', removeIngredient);
    });

    document.getElementById('recipeForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission
        // Create a new FormData object to hold the form data
        const formData = new FormData(event.target);
        // Build the ingredients as a JSON array from form input fields
        const ingredients = [];
        document.querySelectorAll('.ingredient-group').forEach(group => {
            const name = group.querySelector('.ingredient-name').value;
            const quantity = group.querySelector('.ingredient-quantity').value;
            ingredients.push({ name: name, quantity: quantity });
        });
        // Append the ingredients JSON to the FormData as a string
        formData.set('ingredients', JSON.stringify(ingredients));
        // Call the submitRecipeForm function and pass in the handlers
        submitRecipeForm(formData, handleSuccess, handleError);
    });

    loadRecipes();
});

function loadRecipes() {
    fetchRecipes(displayRecipes, handleGETError);
}
