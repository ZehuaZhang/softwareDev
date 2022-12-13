import {Nullable} from '../util/object';

export class DoublyLinkedList<T> {
  head: Nullable<DoubleListNode<T>>;
  tail: Nullable<DoubleListNode<T>>;
  length: number;
  constructor(...dataList: T[]) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    if (dataList) {
      this.fromArray(dataList);
    }
  }

  appendNode(node: DoubleListNode<T>): DoubleListNode<T> {
    node.next = null;
    node.prev = this.tail;

    if (this.tail) {
      this.tail!.next = node;
    }
    this.tail = node;
    if (!this.head) {
      this.head = node;
    }
    ++this.length;
    return this.tail;
  }

  prependNode(node: DoubleListNode<T>): DoubleListNode<T> {
    node.prev = null;
    node.next = this.head;

    if (this.head) {
      this.head!.prev = node;
    }
    this.head = node;
    if (!this.tail) {
      this.tail! = node;
    }
    ++this.length;
    return this.head;
  }

  append(data: T): DoubleListNode<T> {
    const node = new DoubleListNode<T>(data);
    return this.appendNode(node);
  }

  prepend(data: T): DoubleListNode<T> {
    const node = new DoubleListNode<T>(data);
    return this.prependNode(node);
  }

  reverse(): void {
    let [curr, prev, next]: Nullable<DoubleListNode<T>>[] = [
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

  get(index: number): Nullable<DoubleListNode<T>> {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let curr = this.head;
    for (let i = 0; i < index; ++i) {
      curr = curr!.next;
    }
    return curr;
  }

  insert(prev: Nullable<DoubleListNode<T>>, data: T): DoubleListNode<T> {
    let node: Nullable<DoubleListNode<T>> = null;
    if (prev === null) {
      node = this.prepend(data);
    } else if (prev === this.tail) {
      node = this.append(data);
    } else {
      node = new DoubleListNode(data, prev!.next, prev);
      prev!.next = node;
      node.next!.prev = node;
      ++this.length;
    }
    return node;
  }

  insertAt(index: number, data: T): DoubleListNode<T> {
    if (index < 0 || index > this.length) {
      throw new Error('insert - out of bound');
    }
    let prev: Nullable<DoubleListNode<T>> = null;
    if (index === this.length) {
      prev = this.tail;
    } else {
      prev = this.get(index)!.prev;
    }
    return this.insert(prev, data);
  }

  remove(node: DoubleListNode<T>): void {
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

  fromArray(dataList: T[]): DoublyLinkedList<T> {
    dataList.forEach(data => this.append(data));
    return this;
  }

  toArray(): T[] {
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

export class DoubleListNode<T> {
  data: T;
  next: Nullable<DoubleListNode<T>>;
  prev: Nullable<DoubleListNode<T>>;
  constructor(
    data: T,
    next: Nullable<DoubleListNode<T>> = null,
    prev: Nullable<DoubleListNode<T>> = null
  ) {
    this.data = data;
    this.next = next;
    this.prev = prev;
  }
}
