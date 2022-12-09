import {Nullable, Data} from '../util/object';

export class DoublyLinkedList {
  head: Nullable<DoublyLinkedListNode>;
  tail: Nullable<DoublyLinkedListNode>;
  length: number;
  constructor(...dataList: Data[]) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    if (dataList) {
      this.fromArray(dataList);
    }
  }

  append(data: Data): DoublyLinkedListNode {
    const node = new DoublyLinkedListNode(data);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail!.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    ++this.length;
    return this.tail;
  }

  prepend(data: Data): DoublyLinkedListNode {
    const node = new DoublyLinkedListNode(data, this.head);

    if (this.head) {
      this.head!.prev = node;
    }
    this.head! = node;
    if (!this.tail) {
      this.tail! = node;
    }
    ++this.length;
    return this.head;
  }

  reverse(): void {
    let [curr, prev, next]: Nullable<DoublyLinkedListNode>[] = [
      this.head,
      null,
      null,
    ];
    while (curr) {
      next = curr.next;
      prev = curr.prev;

      curr.prev = next;
      curr.next = prev;

      prev = curr;
      curr = next;
    }

    this.tail = this.head;
    this.head = prev;
  }

  get(index: number): Nullable<DoublyLinkedListNode> {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let curr = this.head;
    for (let i = 0; i < index; ++i) {
      curr = curr!.next;
    }
    return curr;
  }

  insert(
    prev: Nullable<DoublyLinkedListNode>,
    data: Data
  ): DoublyLinkedListNode {
    let node: Nullable<DoublyLinkedListNode> = null;
    if (prev === null) {
      node = this.prepend(data);
    } else if (prev === this.tail) {
      node = this.append(data);
    } else {
      node = new DoublyLinkedListNode(data, prev!.next, prev);
      prev!.next = node;
      node.next!.prev = node;
      ++this.length;
    }
    return node;
  }

  insertAt(index: number, data: Data): DoublyLinkedListNode {
    if (index < 0 || index > this.length) {
      throw new Error('insert - out of bound');
    }
    let prev: Nullable<DoublyLinkedListNode> = null;
    if (index === this.length) {
      prev = this.tail;
    } else {
      prev = this.get(index)!.prev;
    }
    return this.insert(prev, data);
  }

  remove(node: DoublyLinkedListNode): void {
    const prev = node.prev;
    const next = node.next;
    if (prev) {
      prev.next = next;
      if (next) {
        next.prev = prev;
      } else {
        this.tail = prev;
      }
    } else {
      this.head = next;
      if (next) {
        next.prev = null;
      } else {
        this.tail = this.head;
      }
    }

    --this.length;
  }

  removeAt(index: number): void {
    if (index < 0 || index >= this.length) {
      throw new Error('remove - out of bound');
    }

    const node = this.get(index)!;
    this.remove(node);
  }

  fromArray(dataList: Data[]): DoublyLinkedList {
    dataList.forEach(data => this.append(data));
    return this;
  }

  toArray(): Data[] {
    const dataList = [];
    for (let curr = this.head; curr; curr = curr.next) {
      dataList.push(curr.data);
    }
    return dataList;
  }

  print(): void {
    const output = this.length
      ? this.toArray().join(' -> ')
      : 'Doubly LinkedList is empty';
    console.log(output);
  }

  printLog(): void {
    const array = this.toArray();
    for (const data of array) {
      console.log(data);
    }
    console.log('head', this.head?.data);
    console.log('tail', this.tail?.data);
    console.log('length', this.length);
  }
}

export class DoublyLinkedListNode {
  data: Data;
  next: Nullable<DoublyLinkedListNode>;
  prev: Nullable<DoublyLinkedListNode>;
  constructor(
    data: Data,
    next: Nullable<DoublyLinkedListNode> = null,
    prev: Nullable<DoublyLinkedListNode> = null
  ) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}
