import { TreeNode } from '../types';

export class ChromeBookmarkService {
  private source = chrome.bookmarks;

  constructor() {
  }

  public searchFolders(query: string, callback: (treeNodes: TreeNode[]) => void) {
    this.source.getTree(tree => {
      callback(this.filterChildren(tree, query.toLocaleLowerCase())
        // extract [0] element
        .map(a => {
          return (a && a.children && a.children[0]) ? a.children[0] : a;
        })
      );
    });
  }

  public saveCurrentTabAsBookmark(parentId: string, callback: (result: TreeNode) => void) {
    chrome.tabs.query({ 'active': true }, tabs => {
      this.source.create({
        parentId: parentId,
        title: tabs[0].title,
        url: tabs[0].url
      }, (result: TreeNode) => {
        callback(result);
      });
    });
  }

  /**
   * Modify tree children according to query
   * @param nodes
   * @param query
   */
  private filterChildren(nodes: TreeNode[], query: string): TreeNode[] {
    if (!nodes) {
      return [];
    }

    return nodes.filter(n => {
      if (n.title.toLocaleLowerCase().includes(query)) {
        n.children = this.filterChildren(n.children, query);

        // hide sibling matches if query.length < 3
        return !(n.url && query.length < 3);
      }

      if (n.children) {
        const filtered = this.filterChildren(n.children, query);

        // show only folders
        n.children = filtered.filter(n2 => !n2.url);

        // if query.length < 3 hide sibling matches
        return query.length < 3 ? n.children.length : filtered.length;
      }

      return false;
    });
  }
}
