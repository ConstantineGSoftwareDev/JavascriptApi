// Selecting DOM elements
const studentButton = document.querySelector("#studentButton");
const studentParagraph = document.querySelector("#studentInfo");
const catDataButton = document.querySelector("#catDataButton");
const selectElement = document.getElementById('catPlayfulness');
const apiOutput = document.getElementById("apiResults");
const errorText = document.querySelector(".errorText");
const mainBody = document.querySelector("#bodyContainer")
/**
 * Event listener for the student button click event.
 * If the student paragraph is empty, fills it with student information.
 */
studentButton.addEventListener("click", function() {
    if (studentParagraph.textContent == "") {
        // Add your code here for what should happen when the button is clicked
        studentParagraph.textContent = "Constantine Grigoriadis - 1234197";
        
    }
});
/**
 * Event listener for the cat data button click event.
 * Calls the validateData function.
 */
catDataButton.addEventListener("click", function()
{
    validateData();
});
/**
 * Validates the selected data and fetches API data accordingly.
 */
function validateData(){
    if(selectElement.value == "0")
    {
        selectElement.classList.remove('borderGreen');
        selectElement.classList.add('borderRed');
        errorText.textContent = "Please select a level of playfulness";
    }
    else
    {
        selectElement.classList.remove('borderRed');
        selectElement.classList.add('borderGreen');
        errorText.textContent = "";
        //Construct the URL with the select Option
        url = `https://api.api-ninjas.com/v1/cats?playfulness=${selectElement.value}`;
        apiKey ="g85cHDn46sqkL74k/u3y7Q==bEOE1A9ZU18l1yMd";
        console.log(url);
        //were using fetch with an API header
        fetch(url, {
            method: 'GET',
            headers: {
              'x-api-key': apiKey,
              'accept': 'application/json'
            }
          })
          .then(response => {
           //Were doing some error handling with the response
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            //if everything works we have Json from the API
            return response.json();
          })
          .then(data => {
            // Process the response json Data
            apiOutput.innerHTML = "";
            //resize the body of the page to fit the incoming data
            resizeBody(selectElement.value);
            //create a table element
            table = document.createElement("table");
            //render the header of the table
            renderTableHeader(table);
            //for each cat we want to build a row for our data
            data.forEach(cat => {
                buildCarRow(cat,table)
            });
            //finally we take the constructed table and append it to our output location
            apiOutput.appendChild(table);
           
          })
          .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
          });
    }

}
/**
 * Renders the table header.
 * 
 * @param {HTMLElement} table - The table element to which the header will be appended.
 */
function renderTableHeader(table)
{
    //were building a row here
    tableHeaderRow = document.createElement("tr");
    //this section sets up each of the Th's in the header row
    catNameHeader = document.createElement("th");
    catNameHeader.textContent = "Name";
    playfulnessHeader = document.createElement("th");
    playfulnessHeader.textContent = "Playfulness"
    originHeader = document.createElement("th");
    originHeader.textContent = "Origin";
    minLifeExpectancyHeader = document.createElement("th");
    minLifeExpectancyHeader.textContent = "Minimum life Expectency";
    maxLifeExpectancyHeader = document.createElement("th");
    maxLifeExpectancyHeader.textContent = "Maximum life Expectency";
    generalHealthHeader = document.createElement("th");
    generalHealthHeader.textContent = "General Health";
    imageHeader = document.createElement("th");
    imageHeader.textContent = "Image";
    
    //append each of the th's to the header row
    tableHeaderRow.appendChild(catNameHeader);
    tableHeaderRow.appendChild(originHeader);
    tableHeaderRow.appendChild(playfulnessHeader);
    tableHeaderRow.appendChild(minLifeExpectancyHeader);
    tableHeaderRow.appendChild(maxLifeExpectancyHeader);
    tableHeaderRow.appendChild(generalHealthHeader);
    tableHeaderRow.appendChild(imageHeader);
    table.appendChild(tableHeaderRow);
}

/**
 * Builds a row for each cat in the table.
 * 
 * @param {object} cat - The cat object containing information to be displayed in the row.
 * @param {HTMLElement} table - The table element to which the row will be appended.
 */
function buildCarRow(cat, table)
{
    //first we build a row to store all the attributes of the cat
    catRow = document.createElement("tr");
    //here we create a bunch of data table elements
    //after we create each element we fill the textcontent with the cat data
    //in some cases we need to format a little more to make it legible
    catName = document.createElement("td");
    catName.textContent = cat.name;
    originData = document.createElement("td");
    originData.textContent = cat.origin;
    playfulnessData = document.createElement("td");
    playfulnessData.textContent = `${cat.playfulness}/5`;
    minLifeExpectancyData = document.createElement("td");
    minLifeExpectancyData.textContent = `${cat.min_life_expectancy} years`;
    maxLifeExpectancyData = document.createElement("td");
    maxLifeExpectancyData.textContent = `${cat.max_life_expectancy} years`;
    generalHealthData = document.createElement("td");
    generalHealthData.textContent = `${cat.general_health}/5`;
    //were creating an td for our images
    imageData = document.createElement("td");
    //we also create our image tag
    imageTag = document.createElement("img");
    //we set the source of our image tag to the cat data for image
    imageTag.src = cat.image_link;
    //were set the alt tag for accessability using the cats name in a formatted string
    imageTag.alt = `Picture of the ${cat.name} Cat`;
    //finally we append the image tag to the Td we created for the image
    imageData.appendChild(imageTag);
    //we are appending a bunch of TD's to the catRow
    catRow.appendChild(catName);
    catRow.appendChild(originData);
    catRow.appendChild(playfulnessData);
    catRow.appendChild(minLifeExpectancyData);
    catRow.appendChild(maxLifeExpectancyData);
    catRow.appendChild(generalHealthData);
    catRow.appendChild(imageData);
    //finally we append the catRow to the table
    table.appendChild(catRow);
}
/**
 * Resizes the body based on the selected playfulness level.
 * 
 * @param {string} playfulness - The selected playfulness level.
 */
function resizeBody(playfulness){
    switch(playfulness)
    {
        case "1":
            //there are not many cats at playfulness 1
            mainBody.style.height = "85vh";
        break;
        case "2":
            //there are a few cats at playfulness 2
            mainBody.style.height = "220vh";
        break;
        case "3":
            //there are a decent number of cats at playfulness 3
            mainBody.style.height = "370vh";
        break;
        case "4":
            //there are a crap ton of cats at playfulness 4
            mainBody.style.height = "795vh";
        break;
        case "5":
            //lots of cats at playfulness 5 but not as many as 4
            mainBody.style.height = "645vh";
        break;
    }   
}