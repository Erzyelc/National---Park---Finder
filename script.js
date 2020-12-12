'use strict';


let apiKey = 'iBipGKeN24l4eek2M5Rw5VDRe2A2s2LBTdBLPlgm';

let searchURL = 'https://developer.nps.gov/api/v1/parks';

function formatQueryParams(params){
    const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayParks(responseJson){
    
    console.log(responseJson);

    $('#results-list').empty();

    for(let i = 0; i < responseJson.data.length; i++){
        console.log('STRING', responseJson.data);
        console.log('STRINGGGGGG', responseJson.data[i].fullName);
        $('#results-list').append(
            `<li>
            <h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href='${responseJson.data[i].url}'>Website</a>
            </li>
            `
        )};

        $('#results').removeClass('hidden');
}


function getParks(query, maxResults = 10){
    const stateCodes = query.split(", ");
    const params = {
        limit: maxResults,
        api_key: apiKey
    }

    let queryURL = '';

    for(let i = 0; i < stateCodes.length; i++){
       queryURL += `stateCode=${stateCodes[i]}&`;
    }

console.log(params);

    const queryString = formatQueryParams(params)
    const url = searchURL + '?' + queryURL + queryString;
    
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {;
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayParks(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm(){
    $('form').submit( event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getParks(searchTerm, maxResults);
    });
}

$(watchForm);