import { BookmarkNodeSuggestionComponent } from './bookmark-node-suggestion.component';
import { TreeNode } from '../types';
import { SuggestionIteratorService } from '../services/suggestion-iterator.service';

export class SuggestionContainerComponent {

  public suggestions: BookmarkNodeSuggestionComponent[] = [];
  public currentSuggestion: BookmarkNodeSuggestionComponent;

  constructor(
    private container: HTMLElement,
    private onNodeSelect: (treeNode: TreeNode) => void,
    private suggestionIterator: SuggestionIteratorService<BookmarkNodeSuggestionComponent> = new SuggestionIteratorService()
  ) {
    this.initKeyboardEventHandlers();
  }

  public setBookmarksTree(treeNodes: TreeNode[]) {
    this.clear();

    treeNodes.forEach((node) => {
      const instance = new BookmarkNodeSuggestionComponent(node, null, this.container, this.onNodeSelect);
      this.suggestions.push(instance);
    });

    this.suggestionIterator.setTree(this.suggestions);
    this.selectSuggestion('first');
  }

  public selectSuggestion(index: 'next' | 'previous' | 'parent' | 'back' | 'first') {
    if (!index) {
      return;
    }

    this.deselectCurrentSuggestion();
    this.currentSuggestion = this.suggestionIterator[index]();
    this.currentSuggestion.select();
  }

  public deselectCurrentSuggestion() {
    if (this.currentSuggestion) {
      this.currentSuggestion.deselect();
    }
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
          this.selectSuggestion('next');
          break;
        }
        case 'ArrowUp': {
          e.preventDefault();
          this.selectSuggestion('previous');
          break;
        }
        case 'ArrowLeft': {
          e.preventDefault();
          this.selectSuggestion('parent');
          break;
        }
        case 'ArrowRight': {
          e.preventDefault();
          if (this.currentSuggestion.children[0]) {
            this.selectSuggestion('next');
          } else {
            this.selectSuggestion('back');
          }
          break;
        }
        case 'Enter': {
          this.onNodeSelect(this.currentSuggestion.bookmarkNode);
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
