// api url
const url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

// get html elements
const pokemonContainer = document.querySelector("#pokemon-container");
const pokemonDetails = document.querySelector("#pokemon-details");
const searchInput = document.querySelector("#search-input");

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
    // for each loop
    data.results.forEach(async (pokemon) => { //async in loop because we are making an API call for each pokemon

        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();

        const card = document.createElement("div");

        const name = document.createElement("h2");
        name.textContent = pokemonData.name;

        card.dataset.name = pokemonData.name;// store the name in a data attribute for search functionality

        const image = document.createElement("img");
        image.src = pokemonData.sprites.front_default;
        image.alt = pokemonData.name;

        card.append(name, image);
        pokemonContainer.appendChild(card);

            // click listener to show details of pokemon cards
            card.addEventListener("click", () => {
            
                //console.log(pokemonData);
                pokemonDetails.innerHTML = `
                <h2>${pokemonData.name}</h2>
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <p>ID: ${pokemonData.id}</p>
                <p>Height: ${pokemonData.height}</p>
                <p>Weight: ${pokemonData.weight}</p>
                <p>Types: ${pokemonData.types.map(type => type.type.name).join(", ")}</p>
                <p>Abilities: ${pokemonData.abilities.map(item => item.ability.name).join(", ")}</p>
                `;
            });

    });

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

    
