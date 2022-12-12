import {Nullable} from '../util/object';

export class LinkedList<T> {
  head: Nullable<ListNode<T>>;
  tail: Nullable<ListNode<T>>;
  length: number;

  constructor(...dataList: T[]) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    if (dataList) {
      this.fromArray(dataList);
    }
  }

  prepend(data: T): ListNode<T> {
    const node = new ListNode(data, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    ++this.length;
    return node;
  }

  append(data: T): ListNode<T> {
    const node = new ListNode(data);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    ++this.length;
    return node;
  }

  reverse(): LinkedList<T> {
    let curr = this.head;
    let prev = null;
    let next = null;

    while (curr) {
      next = curr.next;
      curr.next = prev;
      prev = curr;
      curr = next;
    }
    this.tail = this.head;
    this.head = prev;

    return this;
  }

  get(index: number): Nullable<ListNode<T>> {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let current = this.head;
    for (let i = 0; i < index; ++i) {
      current = current!.next;
    }
    return current;
  }

  insert(prev: Nullable<ListNode<T>>, data: T): ListNode<T> {
    let node: Nullable<ListNode<T>> = null;
    if (prev === null) {
      node = this.prepend(data)!;
    } else if (prev === this.tail) {
      node = this.append(data);
    } else {
      node = new ListNode(data, prev.next);
      prev.next = node;
      ++this.length;
    }
    return node;
  }

  insertAt(index: number, data: T): ListNode<T> {
    if (index < 0 || index > this.length) {
      throw new Error('insertAt: out of bounds');
    }

    const prev = index ? this.get(index - 1) : null;
    const node = this.insert(prev, data);
    return node;
  }

  removeAt(index: number): LinkedList<T> {
    if (index < 0 || index >= this.length) {
      throw new Error('remove: out of bounds');
    }

    const prev = this.get(index - 1);
    if (prev) {
      prev.next = prev.next!.next;
      if (index === this.length - 1) {
        this.tail = prev;
      }
    } else {
      this.head = this.head!.next;
      if (this.length === 1) {
        this.tail = this.head;
      }
    }
    --this.length;
    return this;
  }

  fromArray(dataList: T[]): LinkedList<T> {
    dataList.forEach(data => {
      this.append(data);
    });
    return this;
  }

  toArray(): T[] {
    const dataList = [];
    for (let node = this.head; node; node = node.next) {
      dataList.push(node.data);
    }
    return dataList;
  }

  print(): void {
    const output =
      this.length === 0 ? 'LinkedList is empty' : this.toArray().join(' -> ');
    console.log(output);
  }
}

export class ListNode<T> {
  data: T;
  next: Nullable<ListNode<T>>;

  constructor(data: T, next: Nullable<ListNode<T>> = null) {
    this.data = data;
    this.next = next;
  }
}
