// don't worry, this iconList variable was not written manually ;-) the list contains all know Font Awesome Brand icons (free)
const iconList=["500px","accessible-icon","accusoft","adn","adversal","affiliatetheme","algolia","amazon","amazon-pay","amilia","android","angellist","angrycreative","angular","app-store","app-store-ios","apper","apple","apple-pay","asymmetrik","audible","autoprefixer","avianex","aviato","aws","bandcamp","behance","behance-square","bimobject","bitbucket","bitcoin","bity","black-tie","blackberry","blogger","blogger-b","bluetooth","bluetooth-b","btc","buromobelexperte","buysellads","cc-amazon-pay","cc-amex","cc-apple-pay","cc-diners-club","cc-discover","cc-jcb","cc-mastercard","cc-paypal","cc-stripe","cc-visa","centercode","chrome","cloudscale","cloudsmith","cloudversify","codepen","codiepie","connectdevelop","contao","cpanel","creative-commons","css3","css3-alt","cuttlefish","d-and-d","dashcube","delicious","deploydog","deskpro","deviantart","digg","digital-ocean","discord","discourse","dochub","docker","draft2digital","dribbble","dribbble-square","dropbox","drupal","dyalog","earlybirds","edge","elementor","ember","empire","envira","erlang","ethereum","etsy","expeditedssl","facebook","facebook-f","facebook-messenger","facebook-square","firefox","first-order","firstdraft","flickr","flipboard","fly","font-awesome","font-awesome-alt","font-awesome-flag","fonticons","fonticons-fi","fort-awesome","fort-awesome-alt","forumbee","foursquare","free-code-camp","freebsd","get-pocket","gg","gg-circle","git","git-square","github","github-alt","github-square","gitkraken","gitlab","gitter","glide","glide-g","gofore","goodreads","goodreads-g","google","google-drive","google-play","google-plus","google-plus-g","google-plus-square","google-wallet","gratipay","grav","gripfire","grunt","gulp","hacker-news","hacker-news-square","hips","hire-a-helper","hooli","hotjar","houzz","html5","hubspot","imdb","instagram","internet-explorer","ioxhost","itunes","itunes-note","jenkins","joget","joomla","js","js-square","jsfiddle","keycdn","kickstarter","kickstarter-k","korvue","laravel","lastfm","lastfm-square","leanpub","less","line","linkedin","linkedin-in","linode","linux","lyft","magento","maxcdn","medapps","medium","medium-m","medrt","meetup","microsoft","mix","mixcloud","mizuni","modx","monero","napster","nintendo-switch","node","node-js","npm","ns8","nutritionix","odnoklassniki","odnoklassniki-square","opencart","openid","opera","optin-monster","osi","page4","pagelines","palfed","patreon","paypal","periscope","phabricator","phoenix-framework","php","pied-piper","pied-piper-alt","pied-piper-pp","pinterest","pinterest-p","pinterest-square","playstation","product-hunt","pushed","python","qq","quinscape","quora","ravelry","react","rebel","red-river","reddit","reddit-alien","reddit-square","rendact","renren","replyd","resolving","rocketchat","rockrms","safari","sass","schlix","scribd","searchengin","sellcast","sellsy","servicestack","shirtsinbulk","simplybuilt","sistrix","skyatlas","skype","slack","slack-hash","slideshare","snapchat","snapchat-ghost","snapchat-square","soundcloud","speakap","spotify","stack-exchange","stack-overflow","staylinked","steam","steam-square","steam-symbol","sticker-mule","strava","stripe","stripe-s","studiovinari","stumbleupon","stumbleupon-circle","superpowers","supple","telegram","telegram-plane","tencent-weibo","themeisle","trello","tripadvisor","tumblr","tumblr-square","twitch","twitter","twitter-square","typo3","uber","uikit","uniregistry","untappd","usb","ussunnah","vaadin","viacoin","viadeo","viadeo-square","viber","vimeo","vimeo-square","vimeo-v","vine","vk","vnv","vuejs","weibo","weixin","whatsapp","whatsapp-square","whmcs","wikipedia-w","windows","wordpress","wordpress-simple","wpbeginner","wpexplorer","wpforms","xbox","xing","xing-square","y-combinator","yahoo","yandex","yandex-international","yelp","yoast","youtube","youtube-square"];let moves = 0;
let clockInterval;

function initializeGame() {
	appendCardsToHTML(shuffleSelectedIcons(selectRandomIcons(iconList)));
	initializeNav();
	startClock();
}

function restartGame() {
	appendCardsToHTML(shuffleSelectedIcons(selectRandomIcons(iconList)));
	resetUI();
	resetClock();
}

/*
* @description selectes 16 random icons
*	@param {Array} iconSet - list of icons provided in name format from Font Awesome
*/
function selectRandomIcons(iconSet) {
	const ICON_AMOUNT = 16;
	const setSize = iconSet.length;

	const selectedIcons = Array(ICON_AMOUNT / 2) //divided by two, since we want to have two icons of the same type
		.fill()
		.map(el => iconSet[Math.floor(Math.random() * setSize)]);

	return [...selectedIcons, ...selectedIcons];
}

/*
* @description Randomly shuffles array of icon names
*	@param {Array} selectedIcons - array returned from selectRandomIcons function
*/
function shuffleSelectedIcons(selectedIcons) {
	for (let i = selectedIcons.length - 1; i > 0; i--) {
		const randomInt = Math.floor(Math.random() * (i + 1));
		[selectedIcons[i], selectedIcons[randomInt]] = [selectedIcons[randomInt], selectedIcons[i]];
	}
	return selectedIcons;
}

/*
* @description Creates and appends cards to HTML
* @param {Array} cardArray - array returned from shuffleSelectedIcons function
*/
function appendCardsToHTML(cardArray) {
	removeAllCards();

	const cardDeck = document.querySelector('.card-deck');
	const cardContainer = document.createDocumentFragment();

	cardArray.forEach((el) => {
		let cardDiv = document.createElement('div');
		let card = document.createElement('i');
		cardDiv.className = "card";
		card.className = `fab fa-${el}`;
		cardDiv.appendChild(card);
		cardContainer.appendChild(cardDiv);
	});

	cardDeck.appendChild(cardContainer);
	initializeEventListeners();
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
	let selectedCards = [];

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

function initializeNav() {
	const restartButtons = document.querySelectorAll('.restart');
	restartButtons.forEach((button) => {
		button.addEventListener('click', restartGame);
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
	setTimeout(() => selection.forEach(el => el.className = "card"),1000);
}

/*
* @description Updaes start rating on Modal and Nav
* @param {Number} moves - move amount returned from event listeners
*/
function updateRating(moves) {
	const STEP = 10;
	const stars = document.querySelectorAll('.rating-widget svg.fa-star.gold');
	const modalStars = document.querySelectorAll('.star-stat svg.fa-star.gold');
	const lastStar = stars[stars.length-1];
	const lastModalStar = modalStars[modalStars.length-1];
	//3 cases, since we have 3 stars
	switch (moves) {
		case STEP :
			lastStar.classList.remove('gold');
			lastModalStar.classList.remove('gold');
		break;
		case STEP * 2:
			lastStar.classList.remove('gold');
			lastModalStar.classList.remove('gold');
		break;
		case STEP * 3:
			lastStar.classList.remove('gold');
			lastModalStar.classList.remove('gold');
		break;
	}
}

function updateModalStatistics() {
	const movesFinalStat = document.querySelector('.moves-stat');
	const timeFinalStat = document.querySelector('.time-stat');
	movesFinalStat.innerText = "Total moves: " + moves;
	timeFinalStat.innerText = "Time elapsed: " + document.querySelector('.time').innerText;

}

function checkForWin() {
	const allCards = document.querySelectorAll('.card').length;
	const correctCards = document.querySelectorAll('.correct').length || 0;
	if (correctCards === allCards) {
		awardTheWinner();
	}
}

function awardTheWinner() {
  document.querySelector('.modal').classList.add('active');
	document.querySelector('.dimmer').classList.add('active');

	stopClock();

	updateModalStatistics();
	//create random cat - the main award :)
	fetch('https://aws.random.cat/meow')
	  .then(function(response) {
	    return response.json();
	  })
	  .then(function(data) {
	    document.querySelector('.modal img').setAttribute('src', data.file);
		});
}

function removeAllCards() {
	const cards = document.querySelectorAll('.card');
	cards.forEach(el => {
		el.remove();
	});
}

function resetUI() {
	const stars = document.querySelectorAll('svg.fa-star');
	stars.forEach(el => el.classList.add('gold'));
	document.querySelector('.modal').classList.remove('active');
	document.querySelector('.dimmer').classList.remove('active');
	document.querySelector('.modal img').setAttribute('src', "");
	document.querySelector('.moves').innerText = "Moves: 0";
	moves = 0;
}

initializeGame();
