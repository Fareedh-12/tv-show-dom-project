//You can edit ALL of the code here
//global variable rootElem so that all functions can reach it
const rootElem = document.getElementById("root");

//Function called on every reload of the page
function setup() {
  fetch("https://api.tvmaze.com/shows/82/episodes")
  .then((response)=>{
    return response.json();
  }).then((data)=>{
     allEpisodes = data;

  //Display episodes on screen function
  makePageForEpisodes(allEpisodes);
  //select options display
  displayOptions(allEpisodes);

  //Event listeners for search bar and select options
  searchBar.addEventListener("keyup", searchEpisodes);
  displayEpisodes.addEventListener("change", displayOptionsFromSelect);
  })
  
}

//function that creates a card for each episode
function makePageForEpisodes(episodeList) {
  episodeList.forEach(createCard);
}

// forEach function creates card structure
function createCard(episode){
  cardContainer = document.createElement("div");
  cardHeader = document.createElement("h1");
  cardImg = document.createElement("img");
  cardSummary = document.createElement("p");

  cardContainer.appendChild(cardHeader);
  cardContainer.appendChild(cardImg);
  cardContainer.appendChild(cardSummary);

  rootElem.appendChild(cardContainer);


  if(episode.number >= 10){
    cardHeader.innerHTML = `${episode.name} - S0${episode.season}E${episode.number}`
  }else{
    cardHeader.innerHTML = `${episode.name} - S0${episode.season}E0${episode.number}`
  }

  cardImg.src = episode.image.medium;
  cardSummary.innerHTML = episode.summary;

  cardContainer.className += "container";

}

//functions that creates an option for each episode to be selected
function displayOptions(episodeList){
  episodeList.forEach(episode=> {
    let options = document.createElement("option");
    let displayEpisodes = document.querySelector("#displayEpisodes");
    displayEpisodes.appendChild(options);
    if(episode.number >= 10){
    options.innerHTML = `${episode.name} - S0${episode.season}E${episode.number}`
  }else{
    options.innerHTML = `${episode.name} - S0${episode.season}E0${episode.number}`
  }
  })
}

//Filter function that filters the displayed episodes basing on the user input in the search bar
function searchEpisodes(){
  searchBar = document.getElementById("searchBar");
  // allEpisodes = getEpisodes();
  let filteredEpisodes = allEpisodes.filter(item => {
     rootElem.innerHTML = "";
    if(item.name.toLowerCase().includes(searchBar.value.toLowerCase()) || item.summary.toLowerCase().includes(searchBar.value.toLowerCase())){
      return true;
    }else{
      return false;
    }
  });
  let results = document.querySelector(".results");
  results.textContent = `Displaying ${filteredEpisodes.length}/${allEpisodes.length} episode(s)`
  
  makePageForEpisodes(filteredEpisodes);
}

//filter function that displays only the selected episode from the options
function displayOptionsFromSelect(){
  let displayEpisodes = document.querySelector("#displayEpisodes");
  // allEpisodes =  getEpisodes();
  //reload option for the user to go back to the main page
  if(displayEpisodes.value === "default"){
    location.reload();
  }else{
    let filteredEpisodes = allEpisodes.filter(episode => {
      rootElem.innerHTML = "";
      if(displayEpisodes.value.includes(episode.name)){
        return true;
      }else{
        return false;
      }
    });
  
  makePageForEpisodes(filteredEpisodes);
  }
}


window.onload = setup;
