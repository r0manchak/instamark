import { ChromeBookmarkService } from '../services/chrome-bookmark.service';
import { SuggestionContainerComponent } from './suggestion-container.component';

export class PopupComponent {

  public domElements = {
    searchInput: document.getElementById('search-input'),
    suggestionContainer: document.getElementById('suggestions')
  };

  private bookmarkService: ChromeBookmarkService = new ChromeBookmarkService();

  private suggestionService: SuggestionContainerComponent = new SuggestionContainerComponent(
    this.domElements.suggestionContainer, treeNode => {
      this.bookmarkService.saveCurrentTabAsBookmark(treeNode.id, PopupComponent.close);
    });

  constructor() { }

  public init() {
    this.domElements.searchInput.addEventListener('input', event => {
      const query = (<HTMLInputElement>event.target).value;

      this.bookmarkService.searchFolders(query, treeNodes => {
        this.suggestionService.setBookmarksTree(treeNodes);
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
