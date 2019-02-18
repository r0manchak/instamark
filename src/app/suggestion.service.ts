import { BookmarkFolderSuggestion } from './models/bookmarkFolderSuggestion';

export class SuggestionService {

  public suggestions: BookmarkFolderSuggestion[] = [];
  private selectedSuggestion = -1;

  constructor(
    private container: HTMLElement
  ) {}

  public load(treeNodes: chrome.bookmarks.BookmarkTreeNode[]) {
    this.clear();

    // this.domElements.suggestionContainer.innerHTML = '';
    // suggestionElements.length = 0;
    //
    // folders.forEach((node, i) => {
      // console.log(f, i);
      // const li = document.createElement('li');
      // suggestionElements.push(li);
      //
      // li.innerHTML = f.title;
      // suggestionContainerElement.appendChild(li);
    // });

    // if (folders.length) {
    //   selectedSuggestion = 0;
    //   selectSuggestion();
    // }

  }

  public selectSuggestion(index: number = this.selectedSuggestion) {
    suggestionElements[index].classList.add('selected');
  }

  public unselectSuggestion(index: number = this.selectedSuggestion) {
    suggestionElements[index].classList.remove('selected');
  }

  public selectNextSuggestion(direction = 1) {
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

  public clear() {
    this.suggestions.length = 0;
    this.container.innerHTML = '';
  }
}
