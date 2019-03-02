import { BookmarkNodeSuggestionComponent } from './bookmark-node-suggestion.component';
import { TreeNode } from '../types';

export class SuggestionContainerComponent {

  public suggestions: BookmarkNodeSuggestionComponent[] = [];
  public selectedSuggestion: BookmarkNodeSuggestionComponent;

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
      const instance = new BookmarkNodeSuggestionComponent(node, null, this.container, this.onNodeSelect);
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
    this.selectedSuggestion = (<BookmarkNodeSuggestionComponent>current.value);
    this.selectedSuggestion.select();
  }

  // todo: review before parent-children navigation
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

  // todo build navigation path on the tree
  // encapsulate navigation
  private *iterateSuggestions (current: BookmarkNodeSuggestionComponent) {
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
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          this.selectNextSuggestion(-1);
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
