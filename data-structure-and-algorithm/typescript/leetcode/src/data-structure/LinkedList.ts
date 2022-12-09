import {Nullable, Data} from '../util/object';

export class LinkedList {
  head: Nullable<ListNode>;
  tail: Nullable<ListNode>;
  length: number;

  constructor(...dataList: Data[]) {
    this.head = null;
    this.tail = null;
    this.length = 0;
    if (dataList) {
      this.fromArray(dataList);
    }
  }

  prepend(data: Data): ListNode {
    const node = new ListNode(data, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    ++this.length;
    return node;
  }

  append(data: Data): ListNode {
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

  reverse(): LinkedList {
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

  get(index: number): Nullable<ListNode> {
    if (index < 0 || index >= this.length) {
      return null;
    }

    let current = this.head;
    for (let i = 0; i < index; ++i) {
      current = current!.next;
    }
    return current;
  }

  insert(prev: Nullable<ListNode>, data: Data): ListNode {
    let node: Nullable<ListNode> = null;
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

  insertAt(index: number, data: Data): ListNode {
    if (index < 0 || index > this.length) {
      throw new Error('insertAt: out of bounds');
    }

    const prev = index ? this.get(index - 1) : null;
    const node = this.insert(prev, data);
    return node;
  }

  removeAt(index: number): LinkedList {
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

  fromArray(dataList: Data[]): LinkedList {
    dataList.forEach(data => {
      this.append(data);
    });
    return this;
  }

  toArray(): Data[] {
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

export class ListNode {
  data: Data;
  next: Nullable<ListNode>;

  constructor(data: Data, next: Nullable<ListNode> = null) {
    this.data = data;
    this.next = next;
  }
}
