// don't worry, this variable was not written manually ;-)
const iconList = ["address-book","address-card","adjust","archive","balance-scale","baseball-ball","basketball-ball","bed","birthday-cake","blind","bolt","book","bookmark","bowling-ball","briefcase","building","bullhorn","bullseye","calculator","calendar","calendar-alt","camera","camera-retro","certificate","chart-area","chart-bar","chart-line","chart-pie","child","circle","clipboard","clone","cloud","coffee","columns","comment","compass","compress","copy","copyright","crop","crosshairs","cut","desktop","download","edit","envelope","envelope-open","envelope-square","eraser","expand","eye","eye-dropper","eye-slash","fax","female","file","file-alt","file-image","film","folder","folder-open","football-ball","frown","futbol","globe","golf-ball","hdd","headphones","heart","hockey-puck","id-badge","id-card","image","images","industry","keyboard","laptop","male","map-marker","meh","microchip","mobile","mobile-alt","object-group","object-ungroup","paint-brush","paperclip","paste","pen-square","pencil-alt","percent","phone","phone-square","phone-volume","play","plug","power-off","print","quidditch","registered","save","server","sitemap","sliders-h","smile","square","star","sticky-note","street-view","suitcase","table","table-tennis","tablet","tablet-alt","tag","tags","tasks","thumbtack","tint","trademark","tv","upload","user","user-circle","user-md","user-plus","user-secret","user-times","users","volleyball-ball","wheelchair"];
const cardDeck = document.querySelector('.card-deck');
let selectedCards = [];
let moves = 0;
let clockInterval;

function initializeGame() {
	appendCardsToHTML(shuffleSelectedIcons(selectRandomIcons(iconList)));
	initializeEventListeners();
	startClock();
}

function selectRandomIcons(iconSet) {
	const iconAmount = 16;
	const setSize = iconSet.length;

	const selectedIcons = Array(iconAmount / 2)
	//divided by two, since we want to have two icons of the same type
		.fill()
		.map(el => iconSet[Math.floor(Math.random() * setSize)]);

	return [...selectedIcons, ...selectedIcons];
}

function shuffleSelectedIcons(selectedIcons) {
	for (let i = selectedIcons.length - 1; i > 0; i--) {
		const randomInt = Math.floor(Math.random() * (i + 1));
		[selectedIcons[i], selectedIcons[randomInt]] = [selectedIcons[randomInt], selectedIcons[i]];
	}
	return selectedIcons;
}

function appendCardsToHTML(cardArray) {
	const cardContainer = document.createDocumentFragment();
	cardArray.forEach((el) => {
		let cardDiv = document.createElement('div');
		let card = document.createElement('i');
		cardDiv.className = "card";
		card.className = `fas fa-${el}`;
		cardDiv.appendChild(card);
		cardContainer.appendChild(cardDiv);
	});
	cardDeck.appendChild(cardContainer);
}

//////////// clock functions
function startClock() {
	const timer = document.querySelector('.time');
	const timeStamp = Date.now();

	clearInterval(clockInterval);
	clockInterval = setInterval(() => {
		let timeDiff = Math.floor((Date.now()-timeStamp)/1000);
		let seconds = timeDiff % 60 < 10 ? "0" + timeDiff % 60 : timeDiff % 60;
		let minutes = Math.floor(timeDiff / 60) < 10 ? "0" + Math.floor(timeDiff / 60) : Math.floor(timeDiff / 60);
		timer.innerText = minutes + " : " + seconds;
	},500);
}

function stopClock() {
	clearInterval(clockInterval);
}

function resetClock() {
	clearInterval(clockInterval);
	startClock();
}
///////////

function initializeEventListeners() {
	const cards = document.querySelectorAll('.card');

	cards.forEach(el => {
		el.addEventListener('click', function(evt) {

			if (this.className === "card") {
				this.className = "card selected";
				selectedCards.push(this.firstElementChild.className.baseVal);

				if(selectedCards.length === 2) {
					selectedCards[0] === selectedCards[1] ? colorMatchedCards(true) : colorMatchedCards(false);
					selectedCards = [];
					moves += 1;
					updateRating(moves);
					document.querySelector('.moves').innerText = "Moves: " + moves;
				}
				checkForWin();
			}
		});
	});
}

function colorMatchedCards(bool) {
	const selection = document.querySelectorAll('.selected');
	let newClass = "card correct";

	if (!bool) newClass = "card wrong";

	selection.forEach(el => el.className = newClass);
	restoreIncorrectCards();
}

function restoreIncorrectCards() {
	const selection = document.querySelectorAll('.wrong');
	setTimeout(() => selection.forEach(el => el.className = "card"),1500);
}

function updateRating(moves) {
	const STEP = 10;
	const stars = document.querySelectorAll('svg.fa-star.gold');
	const lastStar = stars[stars.length-1];
	//3 cases, since we have 3 stars
	switch (moves) {
		case STEP :
			lastStar.classList.remove('gold');
		break;
		case STEP * 2:
			lastStar.classList.remove('gold');
		break;
		case STEP * 3:
			lastStar.classList.remove('gold');
		break;
	}
}

function checkForWin() {
	const allCards = document.querySelectorAll('.card').length;
	const correctCards = document.querySelectorAll('.correct').length || 0;
	if (correctCards === allCards) {
		console.log('win!');
		stopClock();
	}
}

initializeGame();