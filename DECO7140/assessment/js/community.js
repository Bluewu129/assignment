import { submitRecipeForm } from './component.js';

document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the form submit button
    document.getElementById('recipeForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = new FormData(event.target);

        // Collect ingredients as a JSON array
        const ingredients = [];
        document.querySelectorAll('.ingredient-group').forEach(group => {
            const name = group.querySelector('.ingredient-name').value;
            const quantity = group.querySelector('.ingredient-quantity').value;
            ingredients.push({ name: name, quantity: quantity });
        });

        // Add ingredients array to formData
        formData.set('ingredients', JSON.stringify(ingredients));

        // Define success and error handlers
        function handleSuccess(result) {
            const messageDiv = document.getElementById('submitResponse');
            messageDiv.textContent = `Thanks! ${result.recipe_name} was submitted successfully!`;
            messageDiv.style.color = "green";

            // Reset the form after success
            document.getElementById('recipeForm').reset();
        }

        function handleError(error) {
            const messageDiv = document.getElementById('submitResponse');
            messageDiv.textContent = "There was a problem submitting your recipe. Please try again.";
            messageDiv.style.color = "red";
        }

        // Call the submitRecipeForm function and pass the form data and handlers
        submitRecipeForm(formData, handleSuccess, handleError);
    });

    // Add ingredient functionality
    const addIngredientBtn = document.getElementById('add-ingredient-btn');
    addIngredientBtn.addEventListener('click', function() {
        const container = document.getElementById('ingredients-container');
        const newIngredientGroup = document.createElement('div');
        newIngredientGroup.classList.add('ingredient-group');
        newIngredientGroup.innerHTML = `
            <input type="text" class="ingredient-name" placeholder="Ingredient Name" required>
            <input type="text" class="ingredient-quantity" placeholder="Quantity" required>
            <button type="button" class="remove-ingredient-btn">Remove</button>`;
        container.appendChild(newIngredientGroup);

        // Attach event listener to remove button
        newIngredientGroup.querySelector('.remove-ingredient-btn').addEventListener('click', function() {
            newIngredientGroup.remove();
        });
    });

    // Attach event listeners to existing remove buttons
    document.querySelectorAll('.remove-ingredient-btn').forEach(button => {
        button.addEventListener('click', function(event) {
            const ingredientGroup = event.target.parentElement;
            ingredientGroup.remove();
        });
    });
});

