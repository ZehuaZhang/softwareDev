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
  sum: number;
  s: number;

  constructor(size: number) {
    this.s = size;
    this.q = [];
    this.sum = 0;
  }

  next(val: number) {
    if (this.q.length === this.s) {
      this.sum -= this.q.shift();
    }

    this.sum += val;
    this.q.push(val);

    return this.sum / this.q.length;
  }
}
