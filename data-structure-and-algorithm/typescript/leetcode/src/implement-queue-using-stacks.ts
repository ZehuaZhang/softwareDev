class MyQueue {
  constructor() {
    this.buffer = [];
    this.output = [];
  }

  push(x) {
    this.buffer.push(x);
  }

  pop() {
    this.transferBufferToOutput();

    return this.output.pop();
  }

  peek() {
    this.transferBufferToOutput();

    return this.output[this.output.length - 1];
  }

  empty() {
    return !this.output.length && !this.buffer.length;
  }

  transferBufferToOutput() {
    if (this.output.length) {
      return;
    }

    while (this.buffer.length) {
      this.output.push(this.buffer.pop());
    }
  }
}
