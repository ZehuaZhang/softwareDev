class Window {
  constructor() {
    this.minHeap = new Heap((a, b) => a < b);
    this.maxHeap = new Heap((a, b) => a > b);
  }

  push(value) {
    this.heap(value).push(value);
    this.balance();
  }

  remove(value) {
    this.heap(value).remove(value);
    this.balance();
  }

  median() {
    if (this.minHeap.size() === this.maxHeap.size()) {
      return (this.minHeap.top() + this.maxHeap.top()) / 2;
    }
    return this.minHeap.top();
  }

  heap(value) {
    return BigInt(value) < this.median() ? this.maxHeap : this.minHeap;
  }

  balance() {
    const diff = this.maxHeap.size() - this.minHeap.size();
    if (diff > 0) {
      this.minHeap.push(this.maxHeap.pop());
    } else if (diff < -1) {
      this.maxHeap.push(this.minHeap.pop());
    }
  }
}
