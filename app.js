async function obtenerPokemones() {
    try {
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon/');
        const datos = await respuesta.json();
        
        const pokemonGrid = document.getElementById('pokemonGrid');
        pokemonGrid.innerHTML = ''; // Limpiar
        for (const pokemon of datos.results) {
            const detallesRespuesta = await fetch(pokemon.url);
            const detalles = await detallesRespuesta.json();

            const pokemonCard = document.createElement('div');
            pokemonCard.className = 'pokemon-card';

            pokemonCard.innerHTML = `
                <img src="${detalles.sprites.front_default}" alt="${pokemon.name}">
                <h3>${pokemon.name}</h3>
                <div class="pokemon-number">#${String(detalles.id).padStart(3, '0')}</div>
            `;

            pokemonGrid.appendChild(pokemonCard);
        }

    } catch (error) {
        console.error('Error:', error);
        const pokemonGrid = document.getElementById('pokemonGrid');
        pokemonGrid.innerHTML = `
            <div style="color: red; text-align: center; padding: 20px;">
                <h2>¡Error!</h2>
                <p>No se pudieron cargar los Pokémon</p>
            </div>
        `;
    }
}

window.onload = obtenerPokemones;