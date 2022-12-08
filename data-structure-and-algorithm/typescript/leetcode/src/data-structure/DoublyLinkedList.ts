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

  append(data: Data): Nullable<DoublyLinkedListNode> {
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

  prepend(data: Data): Nullable<DoublyLinkedListNode> {
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
    node: Nullable<DoublyLinkedListNode>,
    data: Data
  ): Nullable<DoublyLinkedListNode> {
    if (node === null) {
      this.prepend(data);
    }

    const curr = new DoublyLinkedListNode(data, node!.next, node);
    node!.next = curr;
    if (node === this.tail) {
      this.tail = curr;
    } else {
      node!.next.prev = curr;
    }
    ++this.length;
    return curr;
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

  insertAt(index: number, data: Data): Nullable<DoublyLinkedListNode> {
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
    for (const bucket of array) {
      console.log('bucketlist', bucket.data, bucket.keySet);
    }
    console.log('this.head', this.head!.data.data, this.head!.data.keySet);
    console.log('this.tail', this.tail!.data.data, this.tail!.data.keySet);
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
