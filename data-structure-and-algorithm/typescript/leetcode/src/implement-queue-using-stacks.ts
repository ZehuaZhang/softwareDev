import {Stack} from './data-structure/Stack';

class MyQueue {
  buffer: Stack<number>;
  output: Stack<number>;
  constructor() {
    this.buffer = new Stack<number>();
    this.output = new Stack<number>();
  }

  push(x: number): void {
    this.buffer.push(x);
  }

  pop(): number {
    this.transferBufferToOutput();

    return this.output.pop();
  }

  peek() {
    this.transferBufferToOutput();

    return this.output.peek();
  }

  empty() {
    return this.output.isEmpty() && this.buffer.isEmpty();
  }

  transferBufferToOutput(): void {
    if (this.output.size) {
      return;
    }

    while (this.buffer.size) {
      this.output.push(this.buffer.pop());
    }
  }
}
