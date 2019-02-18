import './styles/popup.scss';
import { ChromeBookmarkService, TreeNode } from './app/chrome-bookmark.service';
import { SuggestionService } from './app/suggestion.service';

class Popup {

  public domElements = {
    searchInput: document.getElementById('search-input'),
    suggestionContainer: document.getElementById('suggestions'),
    suggestions: <HTMLElement[]>[]
  };

  private bookmarkService: ChromeBookmarkService = new ChromeBookmarkService();
  private suggestionService: SuggestionService = new SuggestionService(this.domElements.suggestionContainer);

  constructor() { }

  public init() {
    this.domElements.searchInput.focus();
    this.domElements.searchInput.addEventListener('input', event => {
      this.loadSuggestions((<HTMLInputElement>event.target).value);
    });
    this.initKeyboardEventHandlers();
  }

  public loadSuggestions(query: string) {
    // folders.length = 0;
    // folders.push(...bookmarks.filter(b => !b.url));
    this.bookmarkService.searchFolders(query, treeNodes => {
      this.suggestionService.load(treeNodes);
    });
  }

  private initKeyboardEventHandlers() {
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
          // saveBookmark(folders[this.selectedSuggestion]);
          break;
        }
        default: {
          console.log('onkeydown', e.key, e);
          break;
        }
      }
    }

  }
}

new Popup().init();

// function close() {
//     window.close();
// }

// todo: build bookmark trees, not just lists
// load last folder, autocomplete with default option
// use ES6, break into modules, implement virtual DOM
