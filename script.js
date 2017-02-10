function firstLetterToUpperCase(pokemon) {
	pokemon = pokemon.toLowerCase();
	return pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
}

function firstLetterToLowerCase(pokemon) {
	pokemon = pokemon.toLowerCase();
	return pokemon.charAt(0).toLowerCase() + pokemon.slice(1);
}

function displayPokemonData(type, name, pokemonName, dataKey) {
    document.getElementById('name').innerHTML = name;
    document.getElementById('type').innerHTML = type;
    switch(dataKey) {
     case 29:
         pokemonName = "nidoran-f";
         break;
     case 32:
         pokemonName = "nidoran-m";
         break;
     case 83:
         pokemonName = "farfetchd";
         break;
     case 122:
         pokemonName = "mr-mime";
         break;
    }
    document.getElementById('screen').innerHTML = "<img src='http://img.pokemondb.net/artwork/"+ pokemonName +".jpg' class='image'/>";
}

function displayError(pokemon, pokemonStatement) {
    document.getElementById('error').innerHTML = "";
    if (!pokemonStatement && Number.isInteger(pokemon)) {
        document.getElementById('error').innerHTML = "<span id='message'>Pokemon number " + pokemon + " not found</span>";
    } else if (!pokemonStatement) {
        document.getElementById('error').innerHTML = "<span id='message'>" + pokemon + " not found</span>";
    }
}

window.onload = function() {
    document.forms['form'].onsubmit = function() {
        var i = 1;
        var pokemon = document.getElementById('pokemon-number-name').value;
        pokemon = firstLetterToUpperCase(pokemon);
        var pokemonStatement = false;
        var http = new XMLHttpRequest();
        var url = "pokemons.json";
        http.open("GET", url, true);
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        // Request AJAX -> Browse the file to find user's pokemon exist
        http.onload = function() {
            document.getElementById('name').innerHTML = "";
            document.getElementById('type').innerHTML = "";
            document.getElementById('screen').innerHTML = "";
            if(http.readyState == 4 && http.status == 200) {
                var response = JSON.parse(http.responseText);
                for (var dataKey in response){
                    var pokemonName = firstLetterToLowerCase(response[dataKey].name);
                    if (response[dataKey].name === pokemon) {
                        displayPokemonData(response[dataKey].type, response[dataKey].name, pokemonName, i);
                        pokemonStatement = true;
                        break;
                    } else if (dataKey === pokemon) {
                        displayPokemonData(response[dataKey].type, response[dataKey].name, pokemonName, i);
                        pokemonStatement = true;
                        break;
                    }
                    i++;
                }
                displayError(pokemon, pokemonStatement);
            }
        }
        http.send();
        return false;
    };
};