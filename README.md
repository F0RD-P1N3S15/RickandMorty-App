# RickandMorty-App
Een interactieve single-page webapplicatie die gebruikt maakt de Rick and Morty API (https://rickandmortyapi.com/). Hierin kan u alle karakters netjes per karakters de foto, naam, status, geslacht, soort, geboorte en locatie zien. U kan ook de karakter kaartjes sorteren(A->Z, Z->A, bij ID nummer) en filteren (Op geslacht, soort en status). Hiernaast is ook een favouriet functie, waarbij u een karakter kan toegvoegen tot een favoriet-lijst dat u met de favoriet knop kan bekijken.

Screenshots van de webapplicatie:
![Home Page](https://imgur.com/xHce80M)
![Favourites](https://imgur.com/abhj5kF)
![Character Cards](https://imgur.com/x09DlPT)


Functionele vereisten:
- DOM manipulatie:
  Elementen selecteren (vb. main.js -> lijn 4)
  Elementen manipuleren (vb. main.js -> lijn 140)
  Events aan elementen koppelen (vb. main.js -> lijn 66)
- Modern Javascript:
  Gebruik van constanten (vb. main.js -> lijn 1)
  Template literals (vb. main.js -> lijn 150)
  Iteratie over arrays (vb. main.js -> lijn 39)
  Array methodes (vb. main.js -> lijn 80)
  Arrow functions (vb. main.js -> lijn 46)
  Conditional (ternary) operator (moderne if..else) (vb. main.js -> lijn 150)
  Callback functions (vb. main.js -> lijn 205)
  Promises (vb. main.js -> lijn 206)
  Async & Await (vb. main.js -> lijn 20-27)
  Observer API (1 is voldoende) (/)
- Data & API:
  Fetch om date op te halen (vb. main.js -> lijn 22)
  JSON manipuleren en weergeven (vb. main.js -> lijn 23)
- Opslag & validatie:
  Formulier validatie (/)
  Gebruik van LocalStorage (vb. main.js -> lijn 166)
- Styling & layout
  Basis HTML layout (vb. index.html)
  Basis CSS (vb. style.css)
  Gebruiksvriendelijke elementen (vb. main.js -> lijn 150)
- Tooling & structuur:
  Project is opgezet met Vite (vb. package.json)
  Een correcte folderstructuur wordt aangehouden (gescheiden html, css en js files, src folder, dist folder, ...)

 Bronnenvermelding:
 - https://www.youtube.com/watch?v=37vxWr0WgQk&t=355s
 - https://www.youtube.com/watch?v=lgQgt8vnfsY
 - https://www.youtube.com/watch?v=OhMCLs34xwI
 - https://www.youtube.com/watch?v=wxz5vJ1BWrc
 - https://www.youtube.com/watch?v=Ynp6Gdd3XVE&t=393s
 - https://www.w3schools.com/css/css3_gradients.asp
 - https://www.w3schools.com/css/css3_gradients.asp
 - https://www.w3schools.com/jsref/jsref_filter.asp
 - ChatGPT:
   
 - 1:
   
const RickandMortyAPI = "https://rickandmortyapi.com/api/character"; const getCharacters = async () => { let res = await fetch(RickandMortyAPI); let data = await res.json(); return data.results; } let Card = document.createElement('div') Card.classList.add('main') function showCharacters(Characters) { Card.innerHTML = Characters.map(character => { return( <div class="Card"> <p>${character.name} - ${character.status} </p> <img src="${character.image}" alt="${character.name}" /> <div class="cardInfo"> <p>Gender: ${character.gender}</p> <p>Species: ${character.species}</p> <p>Origin: ${character.origin.name}</p> <p>Location: ${character.location.name}</p> </div> </div> ) }).join(''); document.body.append(Card); } showCharacters(character);
-----
❗ Problem:
javascript
KopiërenBewerken
showCharacters(character);
❌ character is undefined
You haven't defined or fetched the variable character. The correct variable is the array of characters returned from getCharacters().
________________________________________
✅ Fix:
You need to call getCharacters(), then pass the result to showCharacters() using then():
javascript
KopiërenBewerken
getCharacters().then(showCharacters);

 - 2:

how would you add the possibility of favourites to a api using localstorage and functions?
-----
🧠 Assumptions
You're using:
•	Frontend only (e.g., with HTML/JavaScript)
•	LocalStorage to persist favorites
•	API data (e.g., fetching items like products, articles, etc.)
________________________________________
✅ Step-by-Step Guide
1. Fetch data from your API
Example (fetching a list of items):
js
KopiërenBewerken
async function fetchItems() {
  const response = await fetch('https://api.example.com/items');
  const items = await response.json();
  return items;
}
________________________________________
2. Store favorites in LocalStorage
Use a key like 'favorites' to store an array of item IDs.
js
KopiërenBewerken
function getFavorites() {
  return JSON.parse(localStorage.getItem('favorites')) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}
________________________________________
3. Toggle favorite function
Add/remove an item from favorites:
js
KopiërenBewerken
function toggleFavorite(itemId) {
  const favorites = getFavorites();
  const index = favorites.indexOf(itemId);

  if (index > -1) {
    favorites.splice(index, 1); // Remove
  } else {
    favorites.push(itemId); // Add
  }

  saveFavorites(favorites);
}
________________________________________
4. Check if an item is a favorite
js
KopiërenBewerken
function isFavorite(itemId) {
  const favorites = getFavorites();
  return favorites.includes(itemId);
}
________________________________________
5. Update UI accordingly
Example (inside a render function):
js
KopiërenBewerken
function renderItems(items) {
  const container = document.getElementById('items');
  container.innerHTML = '';

  items.forEach(item => {
    const div = document.createElement('div');
    div.textContent = item.name;

    const favButton = document.createElement('button');
    favButton.textContent = isFavorite(item.id) ? '★' : '☆';
    favButton.onclick = () => {
      toggleFavorite(item.id);
      renderItems(items); // Re-render to update UI
    };

    div.appendChild(favButton);
    container.appendChild(div);
  });
}
________________________________________
6. Putting it together
js
KopiërenBewerken
async function init() {
  const items = await fetchItems();
  renderItems(items);
}

init();
________________________________________
🧪 Bonus: Show only favorites
js
KopiërenBewerken
function getFavoriteItems(items) {
  const favorites = getFavorites();
  return items.filter(item => favorites.includes(item.id));
}

 - 3:
why does it not fetch characters from all pages when searching? const RickandMortyAPI = "https://rickandmortyapi.com/api/character";
const Search = document.getElementById('Search');
const Favourites = document.getElementById('Favourites');
const previousPage = document.getElementById('previousPage');
const nextPage = document.getElementById('nextPage');
const showCurrentpage = document.getElementById('showCurrentpage');
let allCharacters = [];
let showingFavorites = false;
let currentPage = 1;
let totalPages;

const getCharacters = async (page = 1) => 
{
    const res = await fetch(`${RickandMortyAPI}?page=${page}`);
    const data = await res.json();
    allCharacters = data.results;
    showCharacters(allCharacters);
    UpdateShowcurrentPage();
}

Search.addEventListener('keyup', (x) => 
{
    const searchCharacter = x.target.value.toLowerCase(); 
    const filtered = allCharacters.filter(character =>
        character.name.toLowerCase().includes(searchCharacter)
    ); showCharacters(filtered);
});

let Card = document.createElement('div')
Card.classList.add('Cards')
document.body.append(Card);

function showCharacters(Characters) 
{
    Card.innerHTML = Characters.map(character => 
    {
        const isFav = isFavorite(character.id);
        return(`
            <div class="Cards">
            <div class="Card">
            <p>${character.name} - ${character.status} <button onclick="favouriteCharacter(${character.id})" class="fav-btn">${isFav ? "★" : "☆"}</button></p>
            <img src="${character.image}" alt="${character.name}" /> 
            <div class="cardInfo"> 
                <p>Gender: ${character.gender}</p>
                <p>Species: ${character.species}</p>
                <p>Origin: ${character.origin.name}</p>
                <p>Location: ${character.location.name}</p>
            </div>
            </div>
            </div>
        `) 
    }).join('');
}

function getFavourites() 
{
    return JSON.parse(localStorage.getItem('Favourites')) || [];
}

function addFavourites(Favourites) 
{
    localStorage.setItem('Favourites', JSON.stringify(Favourites));
}

function favouriteCharacter(characterId) 
{
    let Favourites = getFavourites();
    const index = Favourites.indexOf(characterId);

    // Removes the favourite
    if (index > -1) { Favourites.splice(index, 1); } 
    // Adds the favourite
    else { Favourites.push(characterId); }
    
    addFavourites(Favourites);
    // Does a re-render to update the favourite icons
    showCharacters(allCharacters); 
}

function isFavorite(characterId) 
{ 
    return getFavourites().includes(characterId); 
}

Favourites.addEventListener('click', async () => 
{
    if (!showingFavorites) 
    {
        const favouriteIds = getFavourites();

        // Fetches each favourite by their id
        const fetchFavourite = favouriteIds.map(id => fetch(`${RickandMortyAPI}/${id}`).then(res => res.json()));
        const favouriteCharacters = await Promise.all(fetchFavourite);

        showCharacters(favouriteCharacters);
        Favourites.textContent = "Home Page";
    } 
    else 
    {
        getCharacters(currentPage); 
        Favourites.textContent = "Favourites";
    } 
    showingFavorites = !showingFavorites;
});

previousPage.addEventListener('click', () =>
{
    if (currentPage != 1)
    {
        currentPage--;
        getCharacters(currentPage).then(showCharacters);
    } else{}
});

nextPage.addEventListener('click', () => 
{
    if (currentPage != 42)
    {
        currentPage++;
        getCharacters(currentPage).then(showCharacters);
    } else{}
});

function UpdateShowcurrentPage()
{
    showCurrentpage.textContent = `${currentPage}`;
}
getCharacters(currentPage).then(showCharacters);
-----
______________________________________________________________________________________
The reason your search does not fetch characters from all pages is because your current code only loads the characters from a single page (the current page) into allCharacters. When the user types in the search input, you're only filtering this one-page subset, not the entire dataset.
________________________________________
🔍 What's happening?
js
KopiërenBewerken
const getCharacters = async (page = 1) => 
{
    const res = await fetch(`${RickandMortyAPI}?page=${page}`);
    const data = await res.json();
    allCharacters = data.results; // 👈 Only stores current page
}
So, when this line runs:
js
KopiërenBewerken
const filtered = allCharacters.filter(character =>
…it’s only filtering those ~20 characters from the current page.
________________________________________
✅ Solution: Fetch characters from all pages for search
You need to update your search logic to load characters from all pages before filtering.
________________________________________
✅ Updated Code for Cross-Page Search
Replace your search event listener with this:
js
KopiërenBewerken
Search.addEventListener('keyup', async (x) => {
    const searchCharacter = x.target.value.toLowerCase();

    // If search input is empty, reload current page
    if (searchCharacter === '') {
        getCharacters(currentPage);
        return;
    }

    // Fetch all characters if not already done
    if (allCharacters.length < 826) {
        allCharacters = await fetchAllCharacters();
    }

    const filtered = allCharacters.filter(character =>
        character.name.toLowerCase().includes(searchCharacter)
    ); 
    showCharacters(filtered);
});
And add this helper function above or below your getCharacters function:
js
KopiërenBewerken
const fetchAllCharacters = async () => {
    let allData = [];
    let page = 1;
    let totalPages;

    do {
        const res = await fetch(`${RickandMortyAPI}?page=${page}`);
        const data = await res.json();
        totalPages = data.info.pages;
        allData.push(...data.results);
        page++;
    } while (page <= totalPages);

    return allData;
};

