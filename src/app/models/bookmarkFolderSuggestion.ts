export class BookmarkFolderSuggestion {
  constructor(
    public bookmarkNode: chrome.bookmarks.BookmarkTreeNode,
    public domElement: HTMLElement
  ) {}
}
