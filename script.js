//store api access key
const accessKey = "OGzeZHiCivL0OMd-JAq6mBKtpiG3-fnDFiW18tZK8XE";

const formE1 = document.querySelector("form");
const inputE2 = document.getElementById('search-input');
const searchResultsE3 = document.querySelector('.search-results');
const showMoreE4 = document.getElementById('show-more-button');

let inputData = "";
//by default pageno is 1
let page = 1;

async function searchImages() {
  //inputData stores all the keyword that the user is typing in input-field.
  inputData = inputE2.value;

  //creating dyanamic url based on inputData
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  //by using this url api search images from unsplash and display in webpage for that we convert ftn to async ftn which usess fetch and response method
  //fetching data img based on query
  const response = await fetch(url);

  //data variable holding all the json data from response variable.conver response to json so response.json()
  const data = await response.json();

  //covert json to img and text & all result will be stored in results variable
  const results = data.results;

  //initialize the page number and remove previously present images
  if (page === 1) {
    searchResultsE3.innerHTML = " ";
  }

  //inside result variable we have lots of data for showing few we have to map each of data
  results.map((result) => {
    //we have to create container 
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add("search-result");

    //create img which has src and alt
    const img = document.createElement('img');
    img.src = result.urls.small;
    img.alt = result.alt_description;

    //create anchor tag
    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    //append this container inside webpage
    searchResultsE3.appendChild(imageWrapper);
    imageWrapper.appendChild(img);
    imageWrapper.appendChild(imageLink);

  });

  page++;
  if (page > 1) {
    showMoreE4.style.display = "block";
  }
}

//when click on search we call the futn
formE1.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

//when click on showmore we call the futn
showMoreE4.addEventListener("click", () => {
  searchImages();
});