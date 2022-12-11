import {LinkedList} from './data-structure/LinkedList';
import {Data} from './util/object';

class MyLinkedList {
  list: LinkedList;
  constructor() {
    this.list = new LinkedList();
  }

  get(index: number): number {
    const node = this.list.get(index);
    if (node) {
      return node.data;
    }
    return -1;
  }

  addAtHead(data: Data): void {
    this.list.prepend(data);
  }

  addAtTail(data: Data): void {
    this.list.append(data);
  }

  addAtIndex(index: number, data: Data): void {
    if (index >= 0 && index <= this.list.length) {
      this.list.insertAt(index, data);
    }
  }

  deleteAtIndex(index: number): void {
    if (index >= 0 && index < this.list.length) {
      this.list.removeAt(index);
    }
  }
}
