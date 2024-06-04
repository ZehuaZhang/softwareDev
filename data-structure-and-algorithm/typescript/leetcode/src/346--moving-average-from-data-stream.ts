/*
346. Moving Average from Data Stream

Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.

Example:

MovingAverage m = new MovingAverage(3);
m.next(1) = 1
m.next(10) = (1 + 10) / 2
m.next(3) = (1 + 10 + 3) / 3
m.next(5) = (10 + 3 + 5) / 3
*/

class MovingAverage {
  q: number[];
  size: number;
  sum: number;

  constructor(size: number) {
    this.size = size;
    this.sum = 0;
    this.q = [];
  }

  next(val: number) {
    if (this.q.length >= size) {
      this.sum -= this.q.shift()!;
    }
    this.q.push(val);
    this.sum += val;
    return this.sum / this.q.length;
  }
}
