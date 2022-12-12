export class Stack<T> {
  private dataList: T[];
  private capacity: number;

  constructor(capacity = Number.MAX_SAFE_INTEGER) {
    this.dataList = [];
    this.capacity = capacity;
  }

  get size(): number {
    return this.dataList.length;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  isFull(): boolean {
    return this.size === this.capacity;
  }

  push(data: T): void {
    if (this.isFull()) {
      throw new Error('push: stack overflow');
    }
    this.dataList.push(data);
  }

  pop(): T {
    if (this.isEmpty()) {
      throw new Error('pop: stack underflow');
    }
    return this.dataList.pop()!;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error('peek: stack underflow');
    }
    return this.dataList[this.size - 1];
  }

  clear(): void {
    this.dataList = [];
  }

  fromArray(list: T[]): Stack<T> {
    list.forEach(element => {
      this.push(element);
    });
    return this;
  }

  toArray(): T[] {
    return [...this.dataList];
  }

  print(): void {
    const output = this.isEmpty()
      ? 'stack is empty'
      : this.dataList.join(' -> ');
    console.log(output);
  }
}
