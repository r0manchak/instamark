import './styles/popup.scss';

const inputElement = document.getElementById('search-input');
const suggestionContainerElement = document.getElementById('suggestions');
const suggestionElements = [];
const folders = [];

let selectedSuggestion = -1;

function init() {
  inputElement.focus();
  inputElement.addEventListener('input', event => {
    loadSuggestions((<HTMLInputElement>event.target).value);
  });

  initEventHandlers();
}

function initEventHandlers() {
  document.onkeydown = e => {
    switch (e.key) {
      case 'Escape': {
        close();
        break;
      }
      case 'ArrowDown': {
        e.preventDefault();
        selectNextSuggestion(1);
        selectSuggestion();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        selectNextSuggestion(-1);
        selectSuggestion();
        break;
      }
      case 'Enter': {
        saveBookmark(folders[selectedSuggestion]);
        break;
      }
      default: {
        console.log('onkeydown', e.key, e);
        break;
      }
    }
  };
}

function loadSuggestions(query) {
  chrome.bookmarks.search(query, bookmarks => {
    folders.length = 0;
    folders.push(...bookmarks.filter(b => !b.url));
    printFolders(folders);
  });
}

function printFolders(folders) {
  suggestionContainerElement.innerHTML = '';
  suggestionElements.length = 0;

  folders.forEach((f, i) => {
    console.log(f, i);
    const li = document.createElement('li');
    suggestionElements.push(li);

    li.innerHTML = f.title;
    suggestionContainerElement.appendChild(li);
  });

  if (folders.length) {
    selectedSuggestion = 0;
    selectSuggestion();
  }
}

function selectSuggestion(index = selectedSuggestion) {
  suggestionElements[index].classList.add('selected');
}

function unselectSuggestion(index = selectedSuggestion) {
  suggestionElements[index].classList.remove('selected');
}

function selectNextSuggestion(direction = 1) {
  if (direction === 0 || !suggestionElements.length) {
    return;
  }

  if (selectedSuggestion < 0) {
    selectedSuggestion = 0;
    return;
  } else {
    unselectSuggestion();
  }

  if (direction > 0) {
    if (selectedSuggestion >= suggestionElements.length - 1) {
      selectedSuggestion = 0;
      return;
    }
    selectedSuggestion += 1;
    return;
  }

  if (selectedSuggestion <= 0) {
    selectedSuggestion = suggestionElements.length - 1;
    return;
  }

  selectedSuggestion -= 1;
}

function saveBookmark(folder) {
  chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, tabs => {
    chrome.bookmarks.create({
      parentId: folder.id,
      title: tabs[0].title,
      url: tabs[0].url
    }, () => {
      close();
    });
  });
}

// function close() {
//     window.close();
// }

init();

//todo: build bookmark trees, not just lists
// load last folder, autocomplete with default option
// use ES6, break into modules, implement virtual DOM
