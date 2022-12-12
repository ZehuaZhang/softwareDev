import {LinkedList} from './LinkedList';

export class Queue<T> {
  private capacity: number;
  private dataLinkedList: LinkedList<T>;

  constructor(capacity = Number.MAX_SAFE_INTEGER) {
    this.dataLinkedList = new LinkedList();
    this.capacity = capacity;
  }

  get size(): number {
    return this.dataLinkedList.length;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.size === this.capacity;
  }

  push(data: T): void {
    if (this.isFull()) {
      throw new Error('push: queue overflow');
    }
    this.dataLinkedList.append(data);
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error('pop: queue underflow');
    }
    const index = 0;
    const {data} = this.dataLinkedList.get(index)!;
    this.dataLinkedList.removeAt(index);
    return data;
  }

  pushFront(data: T): void {
    if (this.isFull()) {
      throw new Error('pushFront: queue overflow');
    }
    this.dataLinkedList.prepend(data);
  }

  popBack(): T {
    if (this.isEmpty()) {
      throw new Error('pop: queue underflow');
    }
    const index = this.size - 1;
    const {data} = this.dataLinkedList.get(index)!;
    this.dataLinkedList.removeAt(index);
    return data;
  }

  front(): T {
    if (this.isEmpty()) {
      throw new Error('front: queue underflow');
    }
    const {data} = this.dataLinkedList.get(0)!;
    return data;
  }

  back(): T {
    if (this.isEmpty()) {
      throw new Error('front: queue underflow');
    }
    const {data} = this.dataLinkedList.get(this.size - 1)!;
    return data;
  }

  fromArray(dataList: T[]): void {
    dataList.forEach(data => {
      this.push(data);
    });
  }

  toArray(): T[] {
    return this.dataLinkedList.toArray();
  }

  print(): void {
    if (this.isEmpty()) {
      console.log('Queue is empty');
    } else {
      this.dataLinkedList.print();
    }
  }
}
