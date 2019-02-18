export class BookmarkNodeSuggestion {
  constructor(
    public bookmarkNode: chrome.bookmarks.BookmarkTreeNode,
    public domElement: HTMLElement
  ) {}
}
