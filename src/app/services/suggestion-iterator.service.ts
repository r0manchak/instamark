export interface HasFamily<T> {
  parent: T;
  children: T[];
}

export class SuggestionIteratorService<T extends HasFamily<T>> {
  private values: T[];
  private iterationSequence: T[] = [];
  private _currentIndex = 0;
  private previousIndex = 0;

  private set currentIndex(value: number) {
    this.previousIndex = this._currentIndex;
    this._currentIndex = value;
  }

  private get currentIndex() {
    return this._currentIndex;
  }

  public get current(): T {
    return this.iterationSequence[this.currentIndex];
  }

  constructor() {}

  public setTree(suggestions: T[]) {
    this.values = suggestions;

    this.iterationSequence = [];
    this.addToSequence(this.values);
  }

  public first(): T {
    this.currentIndex = 0;
    return this.current;
  }

  public next(): T {
    if (this.currentIndex >= this.iterationSequence.length - 1) {
      this.currentIndex = 0;
      return this.current;
    }
    return this.iterationSequence[++this.currentIndex];
  }

  public previous(): T {
    if (this.currentIndex <= 0) {
      this.currentIndex = this.iterationSequence.length - 1;
      return this.current;
    }
    return this.iterationSequence[--this.currentIndex];
  }

  public parent(): T {
    if (!this.current.parent) {
      return this.current;
    }

    this.currentIndex = this.iterationSequence.indexOf(this.current.parent);
    return this.current;
  }

  public back(): T {
    this.currentIndex = this.previousIndex;
    return this.current;
  }

  private addToSequence(nodes: T[]) {
    for (const node of nodes) {
      this.iterationSequence.push(node);
      this.addToSequence(node.children);
    }
  }
}
