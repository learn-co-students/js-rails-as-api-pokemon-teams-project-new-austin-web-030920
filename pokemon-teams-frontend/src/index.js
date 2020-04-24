const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () => {
    let main = document.querySelector("body main");
    getTrainers(TRAINERS_URL).then( (trainers) => {
        trainers.forEach((trainer) => {
            let card = createTrainerCard(trainer);
            main.appendChild(card);
        });
    });
});

const getTrainers = (url) => {
    return fetch(url).then((res) => res.json())
}

const createTrainerCard = (trainer) => {
    // enclosing card
    let card = document.createElement('div');
    card.className = "card";
    card.dataset.id = trainer.id;

    // trainer name
    let name = document.createElement('p');
    name.innerText = trainer.name;
    card.appendChild(name);

    // 'Add Pokemon' button
    let button = document.createElement('button');
    button.innerText = "Add Pokemon";
    button.dataset.trainer_id = trainer.id;
    button.addEventListener('click', addNewPokemon);
    card.appendChild(button);

    // trainer's list of pokemon
    let pokemonList = document.createElement("ul");
    trainer.pokemons.forEach( (pokemon) => {
        let li = createPokemonListItem(pokemon);
        pokemonList.appendChild(li);
    });

    card.appendChild(pokemonList);

    return card;
}

const addNewPokemon = (event) => {
    let trainerId = event.target.dataset.trainer_id;
    let pokemonList = event.target.nextElementSibling;
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ trainer_id: trainerId })
    })
    .then((res) => res.json())
    .then((pokemon) => {
        let li = createPokemonListItem(pokemon);
        console.log(pokemon);
        pokemonList.appendChild(li);
    });
}

const releasePokemon = (event) => {
    let pokemonId = event.target.dataset.pokemon_id;
    let url = `${POKEMONS_URL}/${pokemonId}`;
    fetch(url, {
        method: 'DELETE'
    })
    .then((res) => res.json())
    .then((pokemon) => {
        // remove pokemon list item
        event.target.parentElement.remove();
    });
}

const createPokemonListItem = (pokemon) => {
    let li = document.createElement('li');
    let button = document.createElement("button");

    button.innerText = "Release";
    button.classname = "release";
    button.dataset.pokemon_id = pokemon.id;
    // add click event listener to each button for
    // pokemon removal
    button.addEventListener('click', releasePokemon);

    li.innerText = `${pokemon.nickname} (${pokemon.species})`;
    li.append(button);

    return li;
}