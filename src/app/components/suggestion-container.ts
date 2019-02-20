import { BookmarkNodeSuggestion } from './bookmark-node-suggestion';
import { TreeNode } from '../types';

export class SuggestionContainer {

  public suggestions: BookmarkNodeSuggestion[] = [];
  // todo: update other methods to use this object
  private selectedSuggestion: {
    parent: TreeNode,
    index: number
  } = {
    parent: null,
    index: -1
  };

  constructor(
    private container: HTMLElement,
    private onNodeSelect: (treeNode: TreeNode) => void
  ) {}

  public setBookmarksTree(treeNodes: TreeNode[]) {
    this.clear();

    treeNodes.forEach((node) => {
      const instance = new BookmarkNodeSuggestion(node, null, this.container, this.onNodeSelect);
      this.suggestions.push(instance);
    });

    this.initKeyboardEventHandlers();
  }

  public selectNextSuggestion(direction: -1|0|1 = 1) {
    if (direction === 0 || !this.suggestions.length) {
      return;
    }

    if (this.selectedSuggestion < 0) {
      this.selectedSuggestion = 0;
      return;
    }

    this.suggestions[this.selectedSuggestion].deselect();

    if (direction > 0) {
      if (this.selectedSuggestion >= this.suggestions.length - 1) {
        this.selectedSuggestion = 0;
        return;
      }
      this.selectedSuggestion += 1;
      return;
    }

    if (this.selectedSuggestion <= 0) {
      this.selectedSuggestion = this.suggestions.length - 1;
      return;
    }

    this.selectedSuggestion -= 1;
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
          // this.suggestions[this.selectedSuggestion].select();
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          this.selectNextSuggestion(-1);
          // this.suggestions[this.selectedSuggestion].select();
          break;
        }
        case 'ArrowLeft':
        case 'ArrowRight': {
          e.preventDefault();
          // todo: navigate btw parent - children
          break;
        }
        case 'Enter': {
          // this.onNodeSelect(this.suggestions[this.selectedSuggestion].bookmarkNode);
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
