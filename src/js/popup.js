const inputElement = document.getElementById('search-input');
const suggestionsElement = document.getElementById('suggestions');

function init() {
    inputElement.focus();
    inputElement.addEventListener('input', event => {
        updateSuggestions(event.target.value);
    });
}

function updateSuggestions(query) {
    suggestionsElement.innerHTML = query;
}

init();
