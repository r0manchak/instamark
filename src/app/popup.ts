import { ChromeBookmarkService } from './services/chrome-bookmark.service';
import { SuggestionService } from './services/suggestion.service';

export class Popup {

  public domElements = {
    searchInput: document.getElementById('search-input'),
    suggestionContainer: document.getElementById('suggestions')
  };

  private bookmarkService: ChromeBookmarkService = new ChromeBookmarkService();
  private suggestionService: SuggestionService = new SuggestionService(
    this.domElements.suggestionContainer, treeNode => {
      this.bookmarkService.saveCurrentTabAsBookmark(treeNode.id, Popup.close);
    });

  constructor() { }

  public init() {
    this.domElements.searchInput.addEventListener('input', event => {
      const query = (<HTMLInputElement>event.target).value;

      this.bookmarkService.searchFolders(query, treeNodes => {
        this.suggestionService.load(treeNodes);
      });
    });

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        close();
      }
    });

    this.domElements.searchInput.focus();
  }

  public static close() {
    window.close();
  }
}
