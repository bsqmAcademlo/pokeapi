const baseUrl = "https://pokeapi.co/api/v2/pokemon";

const pokemonsContainer = document.querySelector(".pokemons");
const contentBtn = document.querySelector(".content_btn");
const inputSearch = document.querySelector("#inputSearch");

let nextPokemons = "";
let previousPokemons = "";

{
    // fetch(baseUrl)
    //     .then((data) => data.json())
    //     .then((response) => console.log(response));
    // async function callApi(url) {
    //     const data = await fetch(url);
    //     const response = await data.json();
    //     console.log(response);
    // }
}

function getPrevious() {
    if (!previousPokemons) return alert("Ya no hay mas pokemones");
    callApi(previousPokemons);
}

function getNext() {
    if (!nextPokemons) return alert("Ya no hay mas pokemones");
    callApi(nextPokemons);
}

function getAll() {
    callApi(baseUrl);
}

async function callApi(url) {
    const data = await fetch(url);
    const { next, previous, results } = await data.json();

    nextPokemons = next;
    previousPokemons = previous;

    printPokemon(results);
}

async function printPokemon(pokemons) {
    let html = "";

    pokemons.forEach(async ({ url }) => {
        const data = await fetch(url);
        const response = await data.json();

        html += `
            <div>
                <h2>${response.name}</h2>
                <img src="${response.sprites.other["official-artwork"].front_default}" alt="${response.name}" />
            </div>
        `;

        pokemonsContainer.innerHTML = html;
    });
}

callApi(baseUrl);

contentBtn.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn_next")) {
        getNext();
    }

    if (e.target.classList.contains("btn_pre")) {
        getPrevious();
    }

    if (e.target.classList.contains("btn_all")) {
        getAll();
    }
});

inputSearch.addEventListener("change", async (e) => {
    try {
        const search = e.target.value;
        const searchUrl = `${baseUrl}/${search}`;

        const data = await fetch(searchUrl);
        const response = await data.json();

        let html = "";

        html += `
            <div>
                <h2>${response.name}</h2>
                <img src="${response.sprites.other["official-artwork"].front_default}" alt="${response.name}" />
            </div>
        `;

        pokemonsContainer.innerHTML = html;
    } catch (error) {
        pokemonsContainer.innerHTML =
            "<h1 class='title_Error'>Este pokemon no se encontro</h1>";
        console.log(error);
    }
});
