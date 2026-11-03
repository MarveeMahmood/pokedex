// api url
const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

// get html elements
const pokemonContainer = document.querySelector("#pokemon-container");
const pokemonDetails = document.querySelector("#pokemon-details");
const searchInput = document.querySelector("#search-input");

let favorites = JSON.parse(localStorage.getItem("favorites")) || []; // retrieve favorites from local storage or initialize as empty array

/////////////////////////////////////// function to fetch data from the API
async function getPokemon() {

    pokemonContainer.textContent = "Loading Pokémon...";

    try {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    pokemonContainer.textContent = "";

    /////////////////////////////////////////// for each loop
    data.results.forEach(async (pokemon) => { //async in loop because we are making an API call for each pokemon

        const pokemonResponse = await fetch(pokemon.url);
        // check individual pokemon response status
        if (!pokemonResponse.ok) {
            throw new Error(`HTTP error! status: ${pokemonResponse.status}`);
        }

        const pokemonData = await pokemonResponse.json();

        const card = document.createElement("div");

        const name = document.createElement("h2");
        name.textContent = pokemonData.name;

        card.dataset.name = pokemonData.name; // store the name in a data attribute for search functionality
        card.dataset.id = pokemonData.id; //store the id in a data attribute for favorites functionality
        const image = document.createElement("img");
        image.src = pokemonData.sprites.front_default;
        image.alt = pokemonData.name;

        const favoriteButton = document.createElement("button");
        if (favorites.includes(pokemonData.id)) {
            favoriteButton.textContent = "Remove from Favorites";
        } else {
            favoriteButton.textContent = "Add to Favorites";
        }

        // click listener for favorite button
        favoriteButton.addEventListener("click", (event) => {
            event.stopPropagation();// prevent the card click event from firing when the button is clicked
            // check if the pokemon is already in favorites
            if (favorites.includes(pokemonData.id)) {
                favorites = favorites.filter(id => id !== pokemonData.id);// remove from favorites
                favoriteButton.textContent = "Add to Favorites";// update button text for pokemon that is removed from favorites

            } else {
                favorites.push(pokemonData.id);
                favoriteButton.textContent = "Remove from Favorites";
            }

            localStorage.setItem("favorites", JSON.stringify(favorites));
        });// end of click event listener

      

        card.append(name, image, favoriteButton);
        pokemonContainer.appendChild(card);

            // click listener to show details of pokemon cards
            card.addEventListener("click", () => {
            
                //console.log(pokemonData);
                pokemonDetails.innerHTML = `
                <button id="close-details">Close</button>
                <h2>${pokemonData.name}</h2>
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <p>ID: ${pokemonData.id}</p>
                <p>Height: ${pokemonData.height}</p>
                <p>Weight: ${pokemonData.weight}</p>
                <p>Types: ${pokemonData.types.map(type => type.type.name).join(", ")}</p>
                <p>Abilities: ${pokemonData.abilities.map(item => item.ability.name).join(", ")}</p>
                `;
                    document.querySelector("#close-details").addEventListener("click", () => {
                        pokemonDetails.innerHTML = "";
                    });

            });// end of click event listener

    });// end of for each loop

        // console.log(pokemonData.name);

        // console.log(pokemonData.sprites.front_default);
        //nestled object and we are accessing the front_default property of the sprites object.

    } catch (error) {
        pokemonContainer.textContent = "Failed to load Pokémon. Please try again later.";
        console.error("Error fetching Pokémon data:", error);  
        }
}

getPokemon();


// input listener for search
searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();

        // console.log(searchValue);

    const cards = pokemonContainer.children;

    Array.from(cards).forEach((card) => {
       
        if (card.dataset.name.includes(searchValue)) {
            card.style.display = "block";
        } else {
                card.style.display = "none";
            }
    });
});

// click listener for show favorites button
const showFavoritesButton = document.querySelector("#show-favorites");

showFavoritesButton.addEventListener("click", () => {
    
    const cards = pokemonContainer.children;

    Array.from(cards).forEach((card) => {
        if (favorites.includes(Number(card.dataset.id))) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

// click listener for show all button
const showAllButton = document.querySelector("#show-all");

showAllButton.addEventListener("click", () => {
    const cards = pokemonContainer.children;

    Array.from(cards).forEach((card) => {
        card.style.display = "block";
    });
});

