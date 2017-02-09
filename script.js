function firstLetterToUpperCase(pokemon) {
	pokemon = pokemon.toLowerCase();
	return pokemon.charAt(0).toUpperCase() + pokemon.slice(1);
}

function firstLetterToLowerCase(pokemon) {
	pokemon = pokemon.toLowerCase();
	return pokemon.charAt(0).toLowerCase() + pokemon.slice(1);
}

function displayPokemonData(type, name, pokemonName, dataKey) {
	$('#type').append(type);
    $('#name').append(name);
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
    $('.screen').append("<img src='http://img.pokemondb.net/artwork/"+ pokemonName +".jpg' class='image'/>");
}

$(function() {
	$('form').submit(function() {
		var i = 1;
		var pokemonStatement = false;
		var pokemon = $('input[type=text]').val();
		pokemon = firstLetterToUpperCase(pokemon);
		$.ajax({
			url : 'pokemons.json',
			type : 'GET',
			dataType : 'json',
			success : function(response) {
				// Clear all div to not keep previous display
				$('#type').empty();
				$('#name').empty();
				$('#error').empty();
				$('.screen').empty();

				// Browse response (pokemon object) to find if the user's pokemon exist
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

               	// If user's pokemon not found, display msg error
                if (!pokemonStatement && $.isNumeric(pokemon)) {
                	$('#error').append("<span id='message'>Pokemon number " + pokemon + " not found</span>");
                } else if (!pokemonStatement) {
                	$('#error').append("<span id='message'>" + pokemon + " not found</span>");
                }
			}
		});
		return false;
	});
});