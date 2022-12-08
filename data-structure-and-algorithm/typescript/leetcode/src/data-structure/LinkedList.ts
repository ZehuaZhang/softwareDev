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

  prepend(data: Data): List {
    const node = new ListNode(data, this.head);
    this.head = node;
    if (!this.tail) {
      this.tail = node;
    }
    ++this.length;
    return this;
  }

  append(data: Data): List {
    const node = new ListNode(data);
    if (!this.head) {
      this.head = this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }
    ++this.length;
    return this;
  }

  reverse(): List {
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

  insert(node: Nullable<ListNode>, data: Data): List {
    if (node === null) {
      this.prepend(data);
      return this;
    }

    const next = node.next;
    node.next = new ListNode(data, next);
    if (node === this.tail) {
      this.tail = node.next;
    }
    return this;
  }

  insertAt(index: number, data: Data): List {
    if (index < 0 || index > this.length) {
      throw new Error('insertAt: out of bounds');
    }

    const prev = this.get(index - 1);
    if (prev) {
      const node = new ListNode(data, prev.next);
      prev.next = node;
      if (prev === this.tail) {
        this.tail = node;
      }
    } else {
      this.prepend(data);
    }
    ++this.length;
    return this;
  }

  removeAt(index: number): List {
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

  fromArray(dataList: Data[]): List {
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
    const output = this.toArray().join(' -> ');
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
