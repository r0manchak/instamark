import { BookmarkNodeSuggestion } from '../models/bookmark-node-suggestion';
import { TreeNode } from '../types';

export class SuggestionService {

  public suggestions: BookmarkNodeSuggestion[] = [];
  private selectedSuggestion = -1;

  constructor(
    private container: HTMLElement,
    public onNodeSelect: (treeNode: TreeNode) => void
  ) {}

  public load(treeNodes: TreeNode[]) {
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

  public selectNextSuggestion(direction: -1|0|1 = 1) {
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

  private initKeyboardEventHandlers() {
    document.addEventListener('keydown', e => {
      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault();
          this.selectNextSuggestion(1);
          this.selectSuggestion();
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          this.selectNextSuggestion(-1);
          this.selectSuggestion();
          break;
        }
        case 'Enter': {
          this.onNodeSelect(null);
          break;
        }
        default: {
          console.log('onkeydown', e.key, e);
          break;
        }
      }
    });
  }

}
