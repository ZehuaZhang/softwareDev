import {Data} from '../util/object';
import {LinkedList} from './LinkedList';

export class Queue {
  private capacity: number;
  private dataLinkedList: LinkedList;

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

  push(data: Data): void {
    if (this.isFull()) {
      throw new Error('push: queue overflow');
    }
    this.dataLinkedList.append(data);
  }

  pop(): Data {
    if (this.isEmpty()) {
      throw new Error('pop: queue underflow');
    }
    const index = 0;
    const {data} = this.dataLinkedList.get(index)!;
    this.dataLinkedList.removeAt(index);
    return data;
  }

  front(): Data {
    if (this.isEmpty()) {
      throw new Error('front: queue underflow');
    }
    const {data} = this.dataLinkedList.get(0)!;
    return data;
  }

  back(): Data {
    if (this.isEmpty()) {
      throw new Error('front: queue underflow');
    }
    const {data} = this.dataLinkedList.get(this.size - 1)!;
    return data;
  }

  fromArray(dataList: Data[]): void {
    dataList.forEach(data => {
      this.push(data);
    });
  }

  toArray(): Data[] {
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
