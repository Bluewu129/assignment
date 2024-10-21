// Set up the headers for student authentication (reusable)
const myHeaders = new Headers();
myHeaders.append("student_number", "s4816737"); // Replace with actual student number
myHeaders.append("uqcloud_zone_id", "28077d3"); // Replace with actual zone ID

// Function to submit a recipe form using FETCH POST
export function submitRecipeForm(formData, handleSuccess, handleError) {
    fetch("https://your-api-endpoint/genericrecipe/", {
        method: "POST",
        headers: myHeaders,
        body: formData,
        redirect: "follow"
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => { throw new Error(errorData.message); });
        }
        return response.json();
    })
    .then(result => {
        handleSuccess(result);
    })
    .catch(error => {
        handleError(error);
    });
}
