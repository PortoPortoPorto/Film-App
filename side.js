const apiKey = 'c2cf63b8'
let filmTitle = ''; 
let encodedTitle = encodeURIComponent(filmTitle);
const filmListDisplay = document.querySelector('#film-list-display'); 

// Function to fetch film via API, using name from search bar 
function getFilm (filmTitle) {
	fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${filmTitle}`) 
	.then((response) => response.json())
	.then((data) => {
		console.log(data); 
		displayFilm(data); 
	})
}


//display fetched film in movie display area
function displayFilm(data) {
	let film = data; 
	const filmBox = document.createElement('div'); 
//Check to see if a film is already displayed. Replace it if so
	if(filmListDisplay.innerHTML.trim() !== '') { 
		console.log('filmbox not empty'); 
		filmListDisplay.innerHTML = ''; 
	}
		filmBox.classList.add('container', 'bg-light',  'p-3', 'm-2', 'rounded', 'row', 'justify-content-around');
		filmBox.innerHTML = 
		`<div id = "film-name" class = "col-2 p-2"><h6>${film.Title}</h6></div>
			<div id = "film-year" class = "col-1 p-2"><h6>${film.Year}</h6></div>
			<div id = "film-genre" class = "col-1 p-2"><h6>${film.Genre}</h6></div>
			<div id = "film-director" class = "col-2 p-2"><h6>${film.Director}</h6></div>
			<div id = "film-metascore" class = "col-1 p-2"><h6>${film.Metascore}</h6></div>
			<div id = "buttons" class = "col-4 d-flex justify-content-around">
				<button class= "btn btn-secondary m-2" data-bs-toggle = "modal" data-bs-target = "#film-modal"><h6>More</h6></button>
				<button class = "btn btn-warning m-2"><h6>Watch</h6></button>
				<button class = "btn btn-success m-2"><h6>Watched</h6></button>
		</div>
	`
	console.log(filmBox); 
	filmListDisplay.appendChild(filmBox);  
}

//Add film to "to watch" list on DOM


//push film onto "to watch list" in local storage 


//Add film to "watched" list on DOM 


//push film to "watched" list on local Storage


//get local storage on pageload


//Remove film from local


//filter list by genre / year / director 


//sort list alphabetically / by year / by metascore 


//"more" button should probably fetch also, given that it exists on containers saved to local storage also
function moreInfo(currentTitle) {
	const encodedCurrentTitle = encodeURIComponent(currentTitle); 
	console.log(encodedCurrentTitle); 
	fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${encodedCurrentTitle}`)
	.then((response) => response.json())
	.then((data) => {
		console.log(data); 
		let filmModalDialogue = document.querySelector('#film-modal-dialogue');
		let modalHTML = 

		`			<div class="modal-content">
      					<div class="modal-header">
       					   <h5 class="modal-title">${data.Title}</h5>
       					   <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      					</div>
     			    <div class="modal-body">
        				<div class = "container bg-light p-1 m-2 rounded row justify-content-around">
							<div id = "film-year" class = "col-3 p-1 text-center"><h6>${data.Year}</h6></div>
							<div id = "film-genre" class = "col-3 p-1 text-center"><h6>${data.Genre}</h6></div>
							<div id = "film-director" class = "col-3 p-1 text-center"><h6>${data.Director}</h6></div>
							<div id = "film-metascore" class = "col-3 p-1 text-center"><h6>${data.Metascore}</h6></div>
						</div>
      				</div>
      				<div class = "modal-body">
      					<div id = "plot" class ="p-2">
      						<h6>PLOT</h6>
      						<em>${data.Plot}</em>
      					</div>
      					<div id = "stars" class ="p-2">
      						<h6>STARS</h6>
      						<em>${data.Actors}</em>
      					</div>
      					<div id = "run-time" class ="p-2">
      						<h6>RUNTIME</h6>
      						<em>${data.Runtime}</em>
      					</div>
      				</div>
      				<div class="modal-footer">
       				    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      				</div>
    			</div>
		` 
		filmModalDialogue.innerHTML = modalHTML; 
		console.log(filmModalDialogue); 
	});
}

//Event listeners 
const filmName = document.querySelector('#film-name'); 
const filmSearch = document.querySelector('#film-search'); 
filmSearch.addEventListener('click',() => {
	const film = filmName.value;
	filmTitle = film; 
	const encodedTitle = encodeURIComponent(filmTitle); 
	getFilm(encodedTitle);
	filmName.value = ''; 
});

//Error Handling



//More Button Event Listener
const moreButtons = document.querySelectorAll('.more-button');
moreButtons.forEach((button) => {
	addEventListener('click', (e) => {
		const currentBox = e.target.parentElement.parentElement.parentElement;
		const currentTitleBox = currentBox.querySelector('#film-name'); 
		const currentTitle = currentTitleBox.firstChild.textContent;
		console.log(currentTitle);  
		moreInfo(currentTitle); 
	});
});




let watchButtons = document.querySelectorAll('.watch-button'); 
watchButtons.forEach((button) => {
	button.addEventListener('click', (e) => {
		const currentBox = e.target.parentElement.parentElement.parentElement;
		const currentTitleBox = currentBox.querySelector('#film-name'); 
		const currentTitle = currentTitleBox.firstChild.textContent;
		//Create an instance of the MovieAPP class
		const movieApp = new MovieApp(api, store, ui);
		movieApp.fetchStoreAndMoveToWatch(currentTitle); 		 
	});
}); 

let watchedButtons = document.querySelectorAll('.watched-button'); 
watchedButtons.forEach((button) => {
	button.addEventListener('click', (e) => {
		const currentBox = e.target.parentElement.parentElement.parentElement;
		const currentTitleBox = currentBox.querySelector('.film-name'); 
		const currentTitle = currentTitleBox.firstChild.textContent;
		//Create an instance of the MovieAPP class
		const movieApp = new MovieApp(api, store, ui);
		console.log(currentBox); 
		if(currentBox.id === "film-list-display") {
			movieApp.fetchStoreAndMoveToWatched(currentTitle); 
		} else {
			movieApp.fetchStoreAndMoveFromWatchToWatched(currentTitle); 
		} 
		console.log(currentBox); 
		movieApp.removeFromListAndStore(currentBox);  
	});
});

const removeButtons = document.querySelectorAll('.remove-button'); 
	removeButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const boxToRemove = e.target.parentElement.parentElement.parentElement;
			//Create an instance of the MovieAPP class
			const movieApp = new MovieApp(api, store, ui);
			console.log(boxToRemove); 
			movieApp.removeFromListAndStore(boxToRemove); 	
		});
	}); 