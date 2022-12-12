/*
1825. Finding MK Average

You are given two integers, m and k, and a stream of integers. You are tasked to implement a data structure that calculates the MKAverage for the stream.

The MKAverage can be calculated using these steps:

If the number of the elements in the stream is less than m you should consider the MKAverage to be -1. Otherwise, copy the last m elements of the stream to a separate container.
Remove the smallest k elements and the largest k elements from the container.
Calculate the average value for the rest of the elements rounded down to the nearest integer.
Implement the MKAverage class:

MKAverage(int m, int k) Initializes the MKAverage object with an empty stream and the two integers m and k.
void addElement(int num) Inserts a new element num into the stream.
int calculateMKAverage() Calculates and returns the MKAverage for the current stream rounded down to the nearest integer.

*/

import {Heap} from './data-structure/Heap';
import {Queue} from './data-structure/Queue';

class MKAverage {
  windowSize: number;
  kth: number;
  sum: number;
  left: Heap<number>;
  minMid: Heap<number>;
  maxMid: Heap<number>;
  right: Heap<number>;
  queue: Queue<number>;

  constructor(windowSize: number, kth: number) {
    this.windowSize = windowSize;
    this.kth = kth;
    this.sum = 0;
    this.left = new Heap((a, b) => b - a);
    this.minMid = new Heap((a, b) => a - b);
    this.maxMid = new Heap((a, b) => b - a);
    this.right = new Heap((a, b) => a - b);
    this.queue = new Queue();
  }

  addElement(num: number) {
    if (this.queue.size < this.windowSize) {
      this.minMid.push(num);
      this.maxMid.push(num);
      this.sum += num;
    }
    this.queue.push(num);
    if (this.queue.size === this.windowSize) {
      for (let i = 0; i < this.kth; ++i) {
        this.left.push(this.minMid.pop());
      }
      for (let i = 0; i < this.kth; ++i) {
        this.right.push(this.maxMid.pop());
      }
      return;
    }

    // number list greater than windows size
    // add new num
    if (num < this.left.peek()) {
      this.left.push(num);
      const data = this.left.pop();
      this.minMid.push(data);
      this.maxMid.push(data);
      this.sum += data;
    } else if (num > this.right.peek()) {
      this.right.push(num);
      const data = this.right.pop();
      this.minMid.push(data);
      this.maxMid.push(data);
      this.sum += data;
    } else {
      this.minMid.push(num);
      this.maxMid.push(num);
      this.sum += num;
    }

    // remove old num
    const data = this.queue.pop();
    if (this.minMid.has(data)) {
      this.minMid.remove(data);
      this.maxMid.remove(data);
      this.sum -= data;
    } else if (this.right.has(data)) {
      this.right.remove(data);
    } else {
      this.left.remove(data);
    }

    // balance three heaps
    if (this.left.size < this.kth) {
      const data = this.minMid.pop();
      this.maxMid.remove(data);
      this.left.push(data);
      this.sum -= data;
    } else if (this.right.size < this.kth) {
      const data = this.maxMid.pop();
      this.minMid.remove(data);
      this.right.push(data);
      this.sum -= data;
    }
  }

  calculateMKAverage() {
    return this.queue.size === this.windowSize
      ? Math.trunc(this.sum / (this.windowSize - 2 * this.kth))
      : -1;
  }
}
