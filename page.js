const pokemonListContainer = document.getElementById("pokemon-list");
const paginationContainer = document.getElementById("pagination");
const apiUrl = "https://pokeapi.co/api/v2/pokemon";
const itemsPerPage = 10;

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function displayPokemonList(offset) {
  const url = `${apiUrl}?offset=${offset}&limit=${itemsPerPage}`;
  const data = await fetchData(url);

  pokemonListContainer.innerHTML = "";
  data.results.forEach(async (pokemon) => {
    const pokemonData = await fetchData(pokemon.url);
    createPokemonCard(pokemonData);
  });

  generatePagination(data.count, offset);
}

function createPokemonCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  const name = document.createElement("h3");
  name.textContent = pokemon.name;

  const image = document.createElement("img");
  image.src = pokemon.sprites.front_default;
  image.alt = pokemon.name;

  card.appendChild(name);
  card.appendChild(image);
  pokemonListContainer.appendChild(card);
}

function generatePagination(totalItems, offset) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const maxVisiblePages = 5;

  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    if (i <= maxVisiblePages || i >= totalPages - maxVisiblePages + 1 || (i >= offset/itemsPerPage && i <= (offset/itemsPerPage) + maxVisiblePages - 1)) {
      const li = document.createElement("li");
      li.classList.add("page-item");
      li.textContent = i;

      if (offset === (i - 1) * itemsPerPage) {
        li.classList.add("bold");
      }

      li.addEventListener("click", () => {
        displayPokemonList((i - 1) * itemsPerPage);
      });

      paginationContainer.appendChild(li);
    } else if (paginationContainer.lastChild && paginationContainer.lastChild.className !== "ellipsis") {
      const ellipsis = document.createElement("span");
      ellipsis.textContent = "...";
      ellipsis.className = "ellipsis";
      paginationContainer.appendChild(ellipsis);
    }
  }
}

displayPokemonList(0);