const studentNumber = 's4816737';
const uqcloudZoneId = '28077d35';
// Set up the headers for student authentication (reusable)
const headers = new Headers();
headers.append("student_number", studentNumber); // Replace with actual student number
headers.append("uqcloud_zone_id", uqcloudZoneId); // Replace with actual zone ID


// Function to submit a recipe form using FETCH POST
function submitRecipeForm(formData, handleSuccess, handleError) {
    fetch("https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericrecipe/", {
        method: "POST",
        headers: headers,
        body: formData,
        redirect: "follow",
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    console.log(errorData)
                    throw new Error('Something went wrong');
                });
            }
            return response.json();
        })
        .then(result => {
            console.log("Recipe create success:", result);
            handleSuccess(result);
        })
        .catch(error => {
            console.log("Recipe create error:", error.message);
            handleError(error);
        });
}

// fetch get recipes data 
function fetchRecipes(displayRecipes, handleGetError) {
    const requestOptions = {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    };

    fetch('https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericrecipe/', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ');
            }
            return response.json();
        })
        .then(result => displayRecipes(result))
        .catch(error => handleGetError(error));
}


export { submitRecipeForm, fetchRecipes };
