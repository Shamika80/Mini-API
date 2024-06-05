$(document).ready(function() {
    
    const urlParams = new URLSearchParams(window.location.search);

    $('#searchButton').on('click', function() {
        const searchTerm = $('#searchInput').val().toLowerCase();

        fetch(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                $('#searchResults').empty(); 
                const pokemonLink = $('<a>').attr('href', `details.html?id=${data.id}`).text(data.name);
                const pokemonImage = $('<img>').attr('src', data.sprites.front_default).attr('alt', data.name);
                const resultItem = $('<div>').append(pokemonImage, pokemonLink);
                $('#searchResults').append(resultItem);
            })
            .catch(error => $('#searchResults').text("Pokémon not found.")); 
    });

    const pokemonId = urlParams.get('id');

    if (pokemonId) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(response => response.json())
            .then(data => {
                $('#pokemonImage').attr('src', data.sprites.front_default);
                $('#pokemonName').text(data.name);

                const typesList = $('<ul>');
                data.types.forEach(type => {
                    typesList.append(createListItem(type.type.name));
                });
                $('#pokemonTypes').append(typesList);

                const abilitiesList = $('<ul>');
                data.abilities.forEach(ability => {
                    abilitiesList.append(createListItem(ability.ability.name));
                });
                $('#pokemonAbilities').append(abilitiesList);

                const statsList = $('<ul>');
                data.stats.forEach(stat => {
                    statsList.append(createListItem(`${stat.stat.name}: ${stat.base_stat}`));
                });
                $('#pokemonStats').append(statsList);
            })
            .catch(error => console.error('Error fetching Pokémon:', error));
    }

    function displayTypePokemon(typeName) {  }

    fetch('https://pokeapi.co/api/v2/type')
        .then(response => response.json())
        .then(data => {
            const types = data.results;
            types.forEach(type => {
                const typeName = type.name;
                const listItem = $(`<li><a href="#" onclick="displayTypePokemon('${typeName}')">${typeName}</a></li>`);
                $('#typeList').append(listItem);
            });
        })
        .catch(error => console.error('Error fetching types:', error));

    const typeNameParam = urlParams.get('type');
    if (typeNameParam) {
        displayTypePokemon(typeNameParam);
    }

    function displayGenerationPokemon(generationId) {
    
    }

    for (let i = 1; i <= 8; i++) {
        const option = $('<option>').val(i).text(`Generation ${i}`);
        $('#generationSelect').append(option);
    }

    $('#generationSelect').on('change', function() {
        const selectedGenerationId = $(this).val();
        displayGenerationPokemon(selectedGenerationId);
    });

    displayGenerationPokemon(1);

   
    function createListItem(text) {
        const li = document.createElement('li');
        li.textContent = text;
        return li;
    }
});