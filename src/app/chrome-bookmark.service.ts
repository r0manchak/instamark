export type TreeNode = chrome.bookmarks.BookmarkTreeNode;

export class ChromeBookmarkService {
  private source = chrome.bookmarks;
  private tree: TreeNode[];

  constructor() {
    this.source.getTree(tree => {
      this.tree = tree;
    });
  }

  public searchFolders(query: string, callback: (treeNodes: TreeNode[]) => void) {
    console.log('query', query);
    callback(this.tree);
  }

  public saveCurrentTabAsBookmark(parentId: string, callback: (result: TreeNode) => void) {
    chrome.tabs.query({ 'active': true, 'lastFocusedWindow': true }, tabs => {
      this.source.create({
        parentId: parentId,
        title: tabs[0].title,
        url: tabs[0].url
      }, (result: TreeNode) => {
        callback(result);
      });
    });
  }
}
