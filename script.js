const url = "https://pokeapi.co/api/v2/pokemon?limit=20&amp;offset=0";

// get html elements
const pokemonContainer = document.querySelector("#pokemon-container");







/////////////////////////////////////// function to fetch data from the API

async function getPokemon() {
    const response = await fetch(url);
    const data = await response.json();

    data.results.forEach(async (pokemon) => { //async in loop because we are making an API call for each pokemon

        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();

        const card = document.createElement("div");

        const name = document.createElement("h2");
        name.textContent = pokemonData.name;

        const image = document.createElement("img");
        image.src = pokemonData.sprites.front_default;
        image.alt = pokemonData.name;

        card.append(name, image);
        pokemonContainer.appendChild(card);


        console.log(pokemonData.name);
        console.log(pokemonData.sprites.front_default);//nestled object and we are accessing the front_default property of the sprites object.

    });

}

getPokemon();


