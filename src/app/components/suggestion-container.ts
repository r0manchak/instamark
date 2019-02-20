import { BookmarkNodeSuggestion } from './bookmark-node-suggestion';
import { TreeNode } from '../types';

export class SuggestionContainer {

  public suggestions: BookmarkNodeSuggestion[] = [];
  public selectedSuggestion: BookmarkNodeSuggestion;

  // private selectedSuggestion: {
  //   parent: BookmarkNodeSuggestion,
  //   index: number
  // } = {
  //   parent: null,
  //   index: -1
  // };

  private suggestionIterator;

  constructor(
    private container: HTMLElement,
    private onNodeSelect: (treeNode: TreeNode) => void
  ) {
    this.initKeyboardEventHandlers();
  }

  public setBookmarksTree(treeNodes: TreeNode[]) {
    this.clear();

    treeNodes.forEach((node) => {
      const instance = new BookmarkNodeSuggestion(node, null, this.container, this.onNodeSelect);
      this.suggestions.push(instance);
    });

    this.initSuggestionIterator();
  }

  public selectNextSuggestion(direction: -1|0|1 = 1) {
    if (direction === 0 || !this.suggestions.length) {
      return;
    }

    if (this.selectedSuggestion) {
      this.selectedSuggestion.deselect();
    }

    let current = this.suggestionIterator.next();
    if (current.done) {
      this.initSuggestionIterator();
      current = this.suggestionIterator.next();
    }
    this.selectedSuggestion = (<BookmarkNodeSuggestion>current.value);
    this.selectedSuggestion.select();

    // const selectedSuggestion = this.getSelectedSuggestion();
    //
    // if (!selectedSuggestion) {
    //   this.selectSuggestion();
    //   return;
    // }
    //
    // selectedSuggestion.deselect();
    //
    // if (direction > 0) {
    //   if (this.selectedSuggestion.index >= this.selectedSuggestion.parent.children.length - 1) {
    //     select next parent
        //
        // this.selectedSuggestion = 0;
        // return;
      // }
      // this.selectedSuggestion += 1;
      // return;
    // }
    //
    // if (this.selectedSuggestion <= 0) {
    //   this.selectedSuggestion = this.suggestions.length - 1;
    //   return;
    // }
    //
    // this.selectedSuggestion -= 1;
  }

  // public selectSuggestion(parent: BookmarkNodeSuggestion = this.suggestions[0], index: number = -1) {
  //   this.selectedSuggestion.parent = parent;
  //   this.selectedSuggestion.index = index;
  // }
  //
  // public getSelectedSuggestion(): BookmarkNodeSuggestion {
  //   if (!this.selectedSuggestion.parent) {
  //     return null;
  //   }
  //
  //   if (this.selectedSuggestion.index === -1) {
  //     return this.selectedSuggestion.parent;
  //   }
  //
  //   return this.selectedSuggestion.parent[this.selectedSuggestion.index];
  // }

  public clear() {
    this.suggestions.length = 0;
    this.container.innerHTML = '';
  }

  private initSuggestionIterator() {
    this.suggestionIterator = this.iterateSuggestions(this.suggestions[0]);
  }

  private *iterateSuggestions (current: BookmarkNodeSuggestion) {
    yield current;
    for (const child of current.children) {
      yield *this.iterateSuggestions(child);
    }
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
          this.onNodeSelect(this.selectedSuggestion.bookmarkNode);
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
