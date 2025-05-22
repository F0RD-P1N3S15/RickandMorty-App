// The API
const RickandMortyAPI = "https://rickandmortyapi.com/api/character";
// The DOM elements that select IDs from index.html
const Search = document.getElementById('Search');
const Favourites = document.getElementById('Favourites');
const previousPage = document.getElementById('previousPage');
const nextPage = document.getElementById('nextPage');
const showCurrentpage = document.getElementById('showCurrentpage');
const Sorting = document.getElementById('Sorting');
const statusFilter = document.getElementById('statusFilter');
const genderFilter = document.getElementById('genderFilter');
const speciesFilter = document.getElementById('speciesFilter');
//The variables
let allCharacters = [];
let showingFavourites = false;
let currentPage = 1;
let totalPages = 42;

// Fetching and showing characters per page for the user 
const getCharacters = async (page = 1) => 
{
    const res = await fetch(`${RickandMortyAPI}?page=${page}`);
    const data = await res.json();
    allCharacters = data.results;
    showCharacters(allCharacters);
    UpdateShowcurrentPage();
}

// Fetching the characters from all pages (Used for Searching & Filtering)
const fetchAllcharacters = async () => 
{
    let allPagesearch = [];
    let Page = 1;

    // Loops through every page to gather the characters
    while (Page <= totalPages) {
        const res = await fetch(`${RickandMortyAPI}?page=${Page}`);
        const data = await res.json();
        allPagesearch.push(...data.results);
        Page++;
    } 
    return allPagesearch;
}

// The Search functionality
Search.addEventListener('keyup', async (x) => 
{
    const searchCharacter = x.target.value.toLowerCase();

    // Fetches all characters if not done yet
    if (allCharacters.length < 826) 
    {
        allCharacters = await fetchAllcharacters();
    }

    // Filters to match the input from the search bar
    const filtered = allCharacters.filter(character =>
        character.name.toLowerCase().includes(searchCharacter)
    );

    // Show filtered characters
    showCharacters(filtered);
});

// The Sorting functionality
Sorting.addEventListener("change", async function() 
{
    // Fetches all characters if not done yet
    if (allCharacters.length < 826)
    {
        allCharacters = await fetchAllcharacters();
    }

    // The options for sorting the characters
    switch (this.value)
    {
        // Sorts the characters A->Z
        case "Ascending":
        {
            allCharacters.sort(function(a, b) 
            {
                return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)
            }); break;
        }
        // Sorts the characters Z->A
        case "Descending":
        {
            allCharacters.sort(function(a, b) 
            {
                return (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0)
            }); break;
        }
        // Sorts the characters on ID number
        case "Default":
        {
            allCharacters.sort(function(a, b)
        {
            return (a.id < b.id) ? 1 : ((b.id > a.id) ? -1 : 0)
        }); break;
        }
    }
    // Show sorted characters
    showCharacters(allCharacters);
})

// The Filtering functionality
async function applyFilters() 
{
    // Fetches all characters if not done yet
    if (allCharacters.length < 826) 
    {
        allCharacters = await fetchAllcharacters();
    }

    // The types of filters
    const statusValue = statusFilter.value;
    const genderValue = genderFilter.value;
    const speciesValue = speciesFilter.value;

    // Filters the characters based on filter choice(status, gender or species)
    const filtered = allCharacters.filter(character => 
    {
        return(
            (genderValue === "" || character.gender === genderValue) &&
            (statusValue === "" || character.status === statusValue) &&
            (speciesValue === "" || character.species === speciesValue)
        );
    });

    // Show filtered characters
    showCharacters(filtered);
}
statusFilter.addEventListener("change", applyFilters);
genderFilter.addEventListener("change", applyFilters);
speciesFilter.addEventListener("change", applyFilters);

// Creates and adds the characters cards
let Card = document.createElement('div')
Card.classList.add('Cards')
document.body.append(Card);

// Show the character cards
function showCharacters(Characters) 
{
    Card.innerHTML = Characters.map(character => 
    {
        const isFav = isFavorite(character.id);
        return(`
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
        `) 
    }).join('');
}

// Gets the favourites from LocalStorage
function getFavourites() 
{
    return JSON.parse(localStorage.getItem('Favourites')) || [];
}

// Adds favourite characters to LocalStorage
function addFavourites(Favourites) 
{
    localStorage.setItem('Favourites', JSON.stringify(Favourites));
}

// (Un-)Favourites character
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

// Checks if a characters is favourites
function isFavorite(characterId) 
{ 
    return getFavourites().includes(characterId); 
}

// Button that switches the user between Home Page and Favourites
Favourites.addEventListener('click', async () => 
{
    if (!showingFavourites) 
    {
        const favouriteIds = getFavourites();

        // Fetches each favourite by their ID
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
    showingFavourites = !showingFavourites;
});

// Button that goes to the previous page
previousPage.addEventListener('click', () =>
{
    if (currentPage != 1)
    {
        currentPage--;
        getCharacters(currentPage).then(showCharacters);
    } else{}
});

// Button that goes to the next page
nextPage.addEventListener('click', () => 
{
    if (currentPage != totalPages)
    {
        currentPage++;
        getCharacters(currentPage).then(showCharacters);
    } else{}
});

// Updates the current page number that is shown to the user
function UpdateShowcurrentPage()
{
    showCurrentpage.textContent = `${currentPage}`;
}

// Initial loading of the characters
getCharacters(currentPage).then(showCharacters);