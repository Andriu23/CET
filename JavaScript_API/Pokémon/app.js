const pokemonInput = document.getElementById('pokemon');
const buscarBtn = document.getElementById('buscar');
const pokemonInfoDiv = document.getElementById('pokemon-info');

buscarBtn.addEventListener('click', () => {
    const pokemonName = pokemonInput.value.trim();
    if (pokemonName) {
        obtenerDatosPokemon(pokemonName);
    } else {
        mostrarError('Por favor, introduce un nombre de Pokémon');
    }
});

function obtenerDatosPokemon(pokemonName) {
    // Construir URL de la API
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    // Mostrar indicador de carga
    pokemonInfoDiv.innerHTML = '<p>Buscando Pokémon...</p>';
    // Realizar petición
    fetch(url)
        .then(response => {
            if (!response.ok) {
                // Manejar el caso de Pokémon no encontrado (código 404)
                if (response.status === 404) {
                    throw new Error('Pokémon no encontrado.');
                }
                throw new Error(`Error: ${response.status}`);
            }
            return response.json();
        })
        .then(data =>
            mostrarDatosPokemon(data))
        .catch(error => mostrarError(error.message));
}

function mostrarDatosPokemon(data) {
    // Extraer los datos relevantes del Pokémon
    const nombre = data.name.charAt(0).toUpperCase() + data.name.slice(1);
    const pokedexId = data.id;
    const altura = (data.height / 10).toFixed(1); // Convertir de decímetros a metros
    const peso = (data.weight / 10).toFixed(1); // Convertir de hectogramos a kilogramos
    const tipos = data.types.map(typeInfo => typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1));
    const imagenSprite = data.sprites.front_default;
    const habilidades = data.abilities.map(abilityInfo => abilityInfo.ability.name.replace('-', ' ').split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
    // Insertar HTML con los datos de Pokémon de forma atractiva
    pokemonInfoDiv.innerHTML = ` ${nombre} #${pokedexId}
                                Altura: ${altura} m
                                Peso: ${peso} kg
                                Tipo(s): ${tipos.join(', ')}
                                Habilidades: ${habilidades.join(', ')}
                                `;
}

function mostrarError(mensaje) {
        resultadoDiv.innerHTML = `<div class="error">
                                    <p>${mensaje}</p>
                                </div>`;
}