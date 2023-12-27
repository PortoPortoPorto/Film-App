
//API CLASS
class API {
// Function to fetch film via API, using name from search bar 
	async getFilm(filmTitle) {
		console.log('LOADING'); 
		try{
			const response = await fetch(`http://www.omdbapi.com/?apikey=${apiKey}&t=${filmTitle}`);
			const data = await response.json(); 
			console.log('LOADED'); 
			return data; 	
		} catch (error) {
			console.error('error fetching film data:', error);
			console.log('LOAD-ERROR'); 
			throw error; 
		}
	}

}

//STORE CLASS
class Store {


//get local storage 
	 getFilms() {
		let films; 
		if (localStorage.getItem('films') === null) {
			films = [];
		} else {
			films= JSON.parse(localStorage.getItem('films'));
		}
		
		//run films through movieApp class into UI class to display locally stored films 
		movieApp.displayStoredFilms(films); 
	}

	 saveFilmData(filmData) {		
//Get Films 
		let films; 
		if (localStorage.getItem('films') === null) {
			films = [];
		} else {
			films= JSON.parse(localStorage.getItem('films'));
		}
//Push updated data into local storage
		films.push(filmData);
		localStorage.setItem('films', JSON.stringify(films)); 
		console.log('film data saved!'); 
	}

//Remove film from local storage
	removeFromStore(filmName) {
		let films; 
		if (localStorage.getItem('films') === null) {
			films = [];
		} else {
			films= JSON.parse(localStorage.getItem('films'));
		} 
		films.forEach((film, index) => {
			if (film.title === filmName) {
				films.splice(index, 1); 
			}
		});
		localStorage.setItem('films', JSON.stringify(films));
		console.log('film removed from storage!')
	}
}

//UI CLASS 
class UI {
//remove listed films from display, restoring this part of the DOM to its original state.
	 refreshDisplay() {
		const toWatchList = document.querySelector('#to-watch'); 
		const watchedList = document.querySelector('#watched'); 

		toWatchList.innerHTML = 
			`   <h1 class = "text-white display-5 text-center p-3">To Watch</h1>
				<div id= "filter-sort-bar" class = "d-flex justify-content-between m-2">
					<div id = filter-by class = "text-white col-2 mx-5 my-2 p-4 text-center"><button class = "btn btn-light"><i class= "bi bi-filter fs-4"></i></button>
					</div>
					<div id = "sort-by"class="text-white col-2 mx-5 my-2 p-4 text-center">
		  				<button id = "sort-to-watch" class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
		   				<i class= "sort-to-watch bi bi-sort-down fs-4"></i></button>
		  				<ul class="dropdown-menu">
						    <li><a class="dropdown-item" id = "title" href="#">Title</a></li>
						    <li><a class="dropdown-item" id = "year" href="#">Year</a></li>
						    <li><a class="dropdown-item" id = "director" href="#">Director</a></li>
						    <li><a class="dropdown-item" id = "genre" href="#">Genre</a></li>
						    <li><a class="dropdown-item" id = "runtime" href="#">Runtime</a></li>
						    <li><a class="dropdown-item" id = "metascore" href="#">Metascore</a></li>
						</ul>
					</div>	
				</div>`;

		watchedList.innerHTML = `
				<h1 class = "text-white display-5 text-center p-3">Watched</h1>
				<div id= "filter-sort-bar-two" class = "d-flex justify-content-between m-2">
					<div id = filter-by class = "text-white col-2 mx-5 my-2 p-4 text-center"><button class = "btn btn-light"><i class= "bi bi-filter fs-4"></i></button>
					</div>
					<div id = "sort-by"class="text-white col-2 mx-5 my-2 p-4 text-center">
		  				<button id= "sort-watched" class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
		   				<i class= "sort-watched bi bi-sort-down fs-4"></i></button>
		  				<ul class="dropdown-menu">
						    <li><a class="dropdown-item" id = "title" href="#">Title</a></li>
						    <li><a class="dropdown-item" id = "year" href="#">Year</a></li>
						    <li><a class="dropdown-item" id = "director" href="#">Director</a></li>
						    <li><a class="dropdown-item" id = "genre" href="#">Genre</a></li>
						    <li><a class="dropdown-item" id = "runtime" href="#">Runtime</a></li>
						    <li><a class="dropdown-item" id = "metascore" href="#">Metascore</a></li>
						</ul>
					</div>
				</div>`;
				console.log('DISPLAY REFRESHED'); 

	}


//display films from local storage 
	 displayStoredFilms(films) {
		const movieApp = new MovieApp(api, store, ui); 
	    movieApp.refreshDisplay(); 
		const toWatchList = document.querySelector('#to-watch'); 
		const watchedList = document.querySelector('#watched'); 
//Sort films into two categories (watched / to watch), place in the corresponding div and style accordingly		
		films.forEach((film, index) => { 
			if (film.isWatched === true) {
				console.log('FILM WATCHED');
				const filmBox = document.createElement('div'); 
				filmBox.classList.add('film-box', 'container', 'bg-success',  'p-3', 'm-2', 'rounded', 'row', 'justify-content-around');
				filmBox.innerHTML = 
					`<div id = "film-${film.imdb}" class = "film-name col-2 p-2"><h6 id ="film-title">${film.title}</h6></div>
					<div class = "col-1 p-2"><h6 id = "film-year">${film.year}</h6></div>
					<div class = "col-1 p-2"><h6 id = "film-genre">${film.genre}</h6></div>
					<div class = "col-2 p-2"><h6 id = "film-director">${film.director}</h6></div>
					<div class = "col-1 p-2"><h6 id = "film-metascore">${film.metascore}</h6></div>
					<div id = "buttons" class = "col-4 d-flex justify-content-around">
						<button class= "more-button btn btn-secondary m-2" data-bs-toggle = "modal" data-bs-target = "#film-modal">More</button>
						<button class = "remove-button btn btn-danger m-2">Remove</button>
					</div>
					`
					watchedList.appendChild(filmBox); 
			} else {
				const filmBox = document.createElement('div'); 
				filmBox.classList.add('film-box', 'container', 'bg-warning',  'p-3', 'm-2', 'rounded', 'row', 'justify-content-around');
				filmBox.innerHTML = 
					`<div id = "film-${film.imdb}" class = "film-name col-2 p-2"><h6 id ="film-title">${film.title}</h6></div>
					<div id = "film-year" class = "col-1 p-2"><h6>${film.year}</h6></div>
					<div id = "film-genre" class = "col-1 p-2"><h6>${film.genre}</h6></div>
					<div id = "film-director" class = "col-2 p-2"><h6>${film.director}</h6></div>
					<div id = "film-metascore" class = "col-1 p-2"><h6>${film.metascore}</h6></div>
					<div id = "buttons" class = "col-4 d-flex justify-content-around">
						<button class= " more-button btn btn-secondary m-2" data-bs-toggle = "modal" data-bs-target = "#film-modal">More</button>
						<button class = "watched-button btn btn-success m-2">Watched</button>
						<button class = "remove-button btn btn-danger m-2">Remove</button>
					</div>
					`
				toWatchList.appendChild(filmBox);				
			}
		});
	}

//display refreshed sorted films 
	displaySortedFilms(data) {
		console.log(data); 


	}

//display fetched film in movie display area
	displayFilm(data) {
		let film = data; 
		console.log(film); 
		const filmBox = document.createElement('div'); 
//Check to see if a film is already displayed. Replace it if so
		if(filmListDisplay.innerHTML.trim() !== '') { 
			console.log('filmbox not empty'); 
			filmListDisplay.innerHTML = ''; 
		}
		filmBox.classList.add('film-list-display', 'container', 'bg-light',  'p-3', 'm-2', 'rounded', 'row', 'justify-content-around');
		filmBox.innerHTML = 
		`<div id = "film-${data.imdbID}" class = "film-name col-2 p-2"><h6 id ="film-title">${film.Title}</h6></div>
			<div id = "film-year" class = "col-1 p-2"><h6>${film.Year}</h6></div>
			<div id = "film-genre" class = "col-1 p-2"><h6>${film.Genre}</h6></div>
			<div id = "film-director" class = "col-2 p-2"><h6>${film.Director}</h6></div>
			<div id = "film-metascore" class = "col-1 p-2"><h6>${film.Metascore}</h6></div>
			<div id = "buttons" class = "col-4 d-flex justify-content-around">
				<button class= " more-button btn btn-secondary m-2" data-bs-toggle = "modal" data-bs-target = "#film-modal">More</button>
				<button name = "watch-button" class = "watch-button btn btn-warning m-2">Watch</button>
				<button name = "watched-button" class = "watched-button btn btn-success m-2">Watched</button>
		</div>
		`
		filmListDisplay.appendChild(filmBox);		
	}

//display more info about film, using data obtained from the API 
	 moreInfo(data) {	
		let filmModalDialogue = document.querySelector('#film-modal-dialogue');
		filmModalDialogue.innerHTML = ''; 
		let modalHTML = 

		`		<div class="modal-content">
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
	}

//Add a searched title to the watch list, using data from API and styling accordingly
	addToWatchList (data) {
		let newFilmBox = document.createElement('div');
		const toWatch = document.querySelector('#to-watch'); 
		newFilmBox.classList.add('container', 'bg-warning',  'p-3', 'm-2', 'rounded', 'row', 'justify-content-around');
		newFilmBox.innerHTML = 
	    `
	    	<div id = "film-${data.imdbID}" class = "film-name col-2 p-2"><h6 id ="film-title" class = "film-title">${data.Title}</h6></div>
				<div id = "film-year" class = "col-1 p-2"><h6 class = "year">${data.Year}</h6></div>
				<div id = "film-genre" class = "col-1 p-2"><h6 class = "genre">${data.Genre}</h6></div>
				<div id = "film-director" class = "col-2 p-2"><h6 class = "director">${data.Director}</h6></div>
				<div id = "film-metascore" class = "col-1 p-2"><h6 class = "metascore">${data.Metascore}</h6></div>
				<div id = "buttons" class = "col-4 d-flex justify-content-around">
					<button class= " more-button btn btn-secondary m-2" data-bs-toggle = "modal" data-bs-target = "#film-modal">More</button>
					<button class = "watched-button btn btn-success m-2">Watched</button>
					<button class = "remove-button btn btn-danger m-2">Remove</button>
			</div>

	    `
	    toWatch.appendChild(newFilmBox); 
	    const filmData = {
	    	imdb: `${data.imdbID}`,
	    	title: `${data.Title}`,
	    	year: `${data.Year}`,
	    	genre: `${data.Genre}`,
	    	director: `${data.Director}`,
	    	metascore: `${data.Metascore}`,
	    	isWatched: false
	    }
// call method in the movieApp class, to save updated film data in local storage 	    
	    movieApp.receiveFilmData(filmData); 
	}

	addToWatchedList (data) {
		console.log(data); 
		let newFilmBox = document.createElement('div');
		const watched = document.querySelector('#watched'); 
		newFilmBox.classList.add('container', 'bg-success',  'p-3', 'm-2', 'rounded', 'row', 'justify-content-around');
		newFilmBox.innerHTML = 
		    `
		    	<div id = "film-${data.imdbID}" class = "film-name col-2 p-2"><h6 id ="film-title" class = "film-title">${data.Title}</h6></div>
					<div id = "film-year" class = "col-1 p-2"><h6 class = "year">${data.Year}</h6></div>
					<div id = "film-genre" class = "col-1 p-2"><h6 class = "genre">${data.Genre}</h6></div>
					<div id = "film-director" class = "col-2 p-2"><h6 class = "director">${data.Director}</h6></div>
					<div id = "film-metascore" class = "col-1 p-2"><h6 class = "metascore">${data.Metascore}</h6></div>
					<div id = "buttons" class = "col-4 d-flex justify-content-around">
						<button class= "more-button btn btn-secondary m-2" data-bs-toggle = "modal" data-bs-target = "#film-modal">More</button>
						<button class = "remove-button btn btn-danger m-2">Remove</button>
				</div>

		    `
	    watched.appendChild(newFilmBox); 
	     const filmData = {
	    	imdb: `${data.imdbID}`,
	    	title: `${data.Title}`,
	    	year: `${data.Year}`,
	    	genre: `${data.Genre}`,
	    	director: `${data.Director}`,
	    	metascore: `${data.Metascore}`,
	    	isWatched: true
	    }
	    movieApp.receiveFilmData(filmData); 
	}
//Clear current search display, called upon when a new film is searched. 
	clearSearched() {
		const searchDisplay = document.querySelector('#film-list-display');
		searchDisplay.innerHTML= ''; 
 
	}	
//Move a film from to watch list to watched list
	moveFromWatchToWatched(data) {
		console.log(data.imdbID); 
		const newFilmData = {
			imdb: `${data.imdbID}`,
	    	title: `${data.Title}`,
	    	year: `${data.Year}`,
	    	genre: `${data.Genre}`,
	    	director: `${data.Director}`,
	    	metascore: `${data.Metascore}`,
	    	isWatched: true
		}
		 movieApp.receiveFilmData(newFilmData);
		 movieApp.getFilms(); 
	}

	removeFromList(film) {
		const filmName = film.querySelector('#film-title').textContent;  
		film.remove(); 
		movieApp.removeFromStore(filmName); 
	}
}

//Add film to "to watch" list on DOM
//Add film to "watched" list on DOM 
//filter list by genre / year / director 
//sort list alphabetically / by year / by metascore 
class Sort  {

 	sortData(category) {
 		const toWatch = document.querySelector('#to-watch');
 		const filmBoxes = Array.from(document.querySelectorAll('.film-box'));
 		
//SORTING LOGIC
 		filmBoxes.sort((a, b) => {
 			const aValue = a.querySelector(`#${category}`).textContent;
 			const bValue = b.querySelector(`#${category}`).textContent;
//TRY TO PASS VALUE AS INTEGER 
 			const textValue = parseInt(aValue, 10); 
//CHECK IF TEXTVALUE IS INTEGER OR LETTERS 
 			if(!(isNaN)(textValue)) {
 				console.log('number');
 				return aValue - bValue; 
 			} else {
 				console.log('letters'); 
 				return aValue.localeCompare(bValue); 
 			}		
 		});

 		toWatch.innerHTML = 
 			`<h1 class = "text-white display-5 text-center p-3">To Watch</h1>
				<div id= "filter-sort-bar" class = "d-flex justify-content-between m-2">
					<div id = filter-by class = "text-white col-2 mx-5 my-2 p-4 text-center"><button class = "btn btn-light"><i class= "bi bi-filter fs-4"></i></button>
					</div>
					<div id = "sort-by"class="text-white col-2 mx-5 my-2 p-4 text-center">
		  				<button id = "sort-to-watch" class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
		   				<i class= " sort-to-watch bi bi-sort-down fs-4"></i></button>
		  				<ul class="dropdown-menu">
						    <li><a class="dropdown-item" id = "title" href="#">Title</a></li>
						    <li><a class="dropdown-item" id = "year" href="#">Year</a></li>
						    <li><a class="dropdown-item" id = "director" href="#">Director</a></li>
						    <li><a class="dropdown-item" id = "genre" href="#">Genre</a></li>
						    <li><a class="dropdown-item" id = "runtime" href="#">Runtime</a></li>
						    <li><a class="dropdown-item" id = "metascore" href="#">Metascore</a></li>
						</ul>
					</div>					
				</div>`

		filmBoxes.forEach((box) => toWatch.appendChild(box)); 

		let filterSortBar = document.querySelector('#filter-sort-bar'); 
		filterSortBar.addEventListener('click', (e) => {
			 if (e.target.id === 'title') {
				console.log('title'); 
				movieApp.sortData('film-title'); 
			} if (e.target.id === 'year') {
				console.log('year');
				movieApp.sortData('film-year'); 
			} if (e.target.id === 'director') {
				console.log('director');
				movieApp.sortData('film-director'); 
			} if (e.target.id === 'genre') {
				console.log('genre'); 
				movieApp.sortData('film-genre'); 
			} if (e.target.id === 'runtime') {
				console.log('runtime');
				movieApp.sortData('film-runtime'); 
			} if (e.target.id === 'metascore') {
				console.log('metascore');
				movieApp.sortData('film-metascore'); 
			} else {
				console.log('no sort option selected'); 
			}

		});
 	}

}





//MOVIEAPP CLASS (LINKS THE THREE CLASSES USING DEPENDENCY INJECTION)

class MovieApp {
 
//CONTRUCTOR CLASS TO CONNECT API/UI/Store 
	constructor(api, store, ui, sort, listener) {
		this.api = api;
		this.store = store; 
		this.ui = ui;
		this.sort = sort;  
		this.listener = listener; 
	}

//METHOD TO FETCH / STORE & DISPLAY FILM DATA	
	async fetchAndDisplayFilmData(filmTitle) {
		try {
			const data = await this.api.getFilm(filmTitle); 
		//this.store.saveData('currentFilm', data);//
			this.ui.displayFilm(data); 
		} catch (error) { 
		// handle errors if needed 
			console.error('error fetching and displaying film data', error); 
		}
	}

//METHOD TO DISPLAY ON MORE INFO
	async fetchAndDisplayMoreInfo(filmTitle) {
		try {
			const data = await this.api.getFilm(filmTitle);
			console.log('more info initiated');
			this.ui.moreInfo(data); 
		} catch (error) {
			console.error('error fetching and displaying more info', error); 
		}
	}

//CHANGE NAME LATER - NO LONGER STORES
	async fetchStoreAndMoveToWatch(filmTitle) {
		try {
			const data = await this.api.getFilm(filmTitle);
			this.ui.clearSearched(); 
			this.ui.addToWatchList(data); 
		} catch (error) {
			console.error('error fetching and adding to watch list', error); 
		}
	}

//CHANGE NAME LATER - NO LONGER STORES
	async fetchStoreAndMoveToWatched(filmTitle) {
		try {	
			const data = await this.api.getFilm(filmTitle);
			this.ui.addToWatchedList(data); 
		} catch (error) {
			console.error('error fetching and adding to watched list', error); 
		}		
	}
//CHANGE NAME LATER - NO LONGER STORES
	async fetchStoreAndMoveFromWatchToWatched(filmTitle) {
		try {	
			const data = await this.api.getFilm(filmTitle); 
			console.log(data); 
			this.ui.moveFromWatchToWatched(data); 
		}  catch (error) {
			console.error('error fetching and moving from watch to watched', error);
		}	
	}

	removeFromListAndStore(boxToRemove) {
		this.ui.removeFromList(boxToRemove); 
	}

	removeFromStore(filmName) {
		this.store.removeFromStore(filmName); 
	}

	getFilms() {
		this.store.getFilms();
	}

	displayStoredFilms(films) {
		this.ui.displayStoredFilms(films); 
	}

	receiveFilmData(filmData) {
		this.store.saveFilmData(filmData);
	}

	refreshDisplay() {
		this.ui.refreshDisplay(); 
	}

	sortData(category) {
		console.log(category);
		this.sort.sortData(category); 
	}

}
//Event Listeners etc 

//Event listeners 
const filmName = document.querySelector('#film-name'); 
const filmSearch = document.querySelector('#film-search');

// INSTANTIATE THE CLASSES 
const api = new API(); 
const store = new Store(); 
const ui = new UI(); 
const sort = new Sort(); 
	
movieApp = new MovieApp(api, store, ui, sort); 
movieApp.getFilms(); 


filmSearch.addEventListener('click',() => {
	const film = filmName.value;
	filmTitle = film; 
	const encodedTitle = encodeURIComponent(filmTitle); 
	//Create an instance of the MovieAPP class 
	movieApp.fetchAndDisplayFilmData(encodedTitle);
	filmName.value = ''; 
});



const apiKey = 'c2cf63b8'
let filmTitle = ''; 
let encodedTitle = encodeURIComponent(filmTitle);
const filmListDisplay = document.querySelector('#film-list-display'); 
const filmListContainer = document.querySelector('#film-list-container'); 
const toWatchList = document.querySelector('#to-watch'); 
const watchedList = document.querySelector('#watched'); 

filmListContainer.addEventListener('click', (e) =>  {
	const target = e.target;
	
	if (target.classList.contains('watch-button')) {
		console.log('WATCH'); 
		const currentBox = target.parentElement.parentElement;
		console.log(currentBox); 
		const currentTitleBox = currentBox.querySelector('.film-name'); 
		console.log(currentTitleBox); 
		const currentTitle = currentTitleBox.textContent;
		console.log(currentTitle); 
		
		movieApp.fetchStoreAndMoveToWatch(currentTitle); 
	}

	if (target.classList.contains('watched-button')) {
		console.log('WATCHED'); 
		const currentBox = target.parentElement.parentElement;
		const currentTitleBox = currentBox.querySelector('.film-name'); 
		const currentTitle = currentTitleBox.textContent;
		//Create an instance of the MovieAPP class 
		console.log(currentBox); 
		if(currentBox.classList.contains("film-list-display")) {
			movieApp.fetchStoreAndMoveToWatched(currentTitle);
			console.log('moved to watched') 
		} else {
			movieApp.fetchStoreAndMoveFromWatchToWatched(currentTitle); 
				console.log('moved from watch to watched')
		} 
		console.log(currentBox); 
		movieApp.removeFromListAndStore(currentBox);  
	}

	if (target.classList.contains('more-button')) {
		console.log('MORE'); 
		const currentBox = target.parentElement.parentElement;
		const currentTitleBox = currentBox.querySelector('.film-name');
		console.log(currentTitleBox);  
		const currentTitle = currentTitleBox.textContent;
		console.log(currentTitle); 
		//Create an instance of the MovieAPP class
		movieApp.fetchAndDisplayMoreInfo(currentTitle);   

	}

	if (target.classList.contains('remove-button')) {
		console.log('REMOVE'); 
		const boxToRemove = target.parentElement.parentElement; 
		//Create an instance of the MovieAPP class
		movieApp.removeFromListAndStore(boxToRemove); 
	}
});

//const moveButton = document.querySelector('#')
//Do the same as above, for movie a film from 'to watch' to 'watched'


let filterSortBar = document.querySelector('#filter-sort-bar'); 
filterSortBar.addEventListener('click', (e) => {
	 if (e.target.id === 'title') {
		console.log('title'); 
		movieApp.sortData('film-title'); 
	} if (e.target.id === 'year') {
		console.log('year');
		movieApp.sortData('film-year'); 
	} if (e.target.id === 'director') {
		console.log('director');
		movieApp.sortData('film-director'); 
	} if (e.target.id === 'genre') {
		console.log('genre'); 
		movieApp.sortData('film-genre'); 
	} if (e.target.id === 'runtime') {
		console.log('runtime');
		movieApp.sortData('film-runtime'); 
	} if (e.target.id === 'metascore') {
		console.log('metascore');
		movieApp.sortData('film-metascore'); 
	} else {
		console.log('no sort option selected'); 
	}


});

let filterSortBarTwo = document.querySelector('#filter-sort-bar-two'); 
filterSortBarTwo.addEventListener('click', (e) => {
	if (e.target.classList.contains('title-Z-A')) {
		console.log('title-Z-A');  
	} if (e.target.classList.contains('title-A-Z')){
		console.log('title-A-Z');
	} if (e.target.classList.contains('year')){
		console.log('year');
	} if (e.target.classList.contains('director')){
		console.log('director');
	} if (e.target.classList.contains('genre')){
		console.log('genre');
	} if (e.target.classList.contains('runtime')){
		console.log('runtime');
	} if (e.target.classList.contains('metascore')) {
		console.log('metascore'); 
	} else {
		console.log('no sort option selected'); 
	}

});



  