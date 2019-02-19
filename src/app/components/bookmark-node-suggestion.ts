import { TreeNode } from '../types';

export class BookmarkNodeSuggestion {
  public children: BookmarkNodeSuggestion[] = [];

  public domElements = {
    currentItem: null,
    content: null,
    title: null,
    button: null,
    subContainer: null
  };

  constructor(
    public bookmarkNode: TreeNode,
    public parent: BookmarkNodeSuggestion,
    private container: HTMLElement,
    private onselect: (node: TreeNode) => void
  ) {
    this.generateHtml();

    if (this.bookmarkNode.children) {
      this.bookmarkNode.children.forEach((node) => {
        const child = new BookmarkNodeSuggestion(node, this, this.domElements.subContainer, this.onselect);
        this.children.push(child);
      });
    }
  }

  public select() {
    this.domElements.currentItem.classList.add('active');
  }

  public deselect() {
    this.domElements.currentItem.classList.remove('active');
  }

  private generateHtml() {
    const template = <HTMLTemplateElement>document.getElementById('suggestion-item-tpl');
    let currentItem;

    for (let i = 0; i < template.content.childNodes.length; ++i) {
      if (template.content.childNodes.item(i).nodeType === Node.ELEMENT_NODE) {
        currentItem = template.content.childNodes.item(i).cloneNode(true);
        break;
      }
    }

    if (!currentItem) {
      return;
    }

    this.domElements.currentItem = currentItem;
    this.domElements.content = currentItem.getElementsByClassName('suggestion-content')[0];
    this.domElements.title = currentItem.getElementsByClassName('suggestion-title')[0];
    this.domElements.button = currentItem.getElementsByClassName('suggestion-add')[0];
    this.domElements.subContainer = currentItem.getElementsByClassName('suggestion-list')[0];

    this.domElements.title.innerHTML = this.bookmarkNode.title;

    this.domElements.button.addEventListener('click', e => {
      console.log('new btn clck', e);
    });

    this.domElements.content.addEventListener('click', () => {
      this.onselect(this.bookmarkNode);
    });

    this.container.appendChild(currentItem);
  }
}
