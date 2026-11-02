const url = "https://pokeapi.co/api/v2/pokemon?limit=20&amp;offset=0";

// function to fetch data from the API

async function getPokemon() {
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);
}

getPokemon();


