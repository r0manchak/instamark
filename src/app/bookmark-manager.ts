class BookmarkManager {
  private tree;

  constructor() {
    chrome.bookmarks.getTree(tree => {
      this.tree = tree;
    });
  }
}
