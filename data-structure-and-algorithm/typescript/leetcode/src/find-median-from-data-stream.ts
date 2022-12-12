/*
The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value and the median is the mean of the two middle values.

For example, for arr = [2,3,4], the median is 3.
For example, for arr = [2,3], the median is (2 + 3) / 2 = 2.5.
Implement the MedianFinder class:

MedianFinder() initializes the MedianFinder object.
void addNum(int num) adds the integer num from the data stream to the data structure.
double findMedian() returns the median of all elements so far. Answers within 10-5 of the actual answer will be accepted.


Example 1:

Input
["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]
[[], [1], [2], [], [3], []]
Output
[null, null, null, 1.5, null, 2.0]

Explanation
MedianFinder medianFinder = new MedianFinder();
medianFinder.addNum(1);    // arr = [1]
medianFinder.addNum(2);    // arr = [1, 2]
medianFinder.findMedian(); // return 1.5 (i.e., (1 + 2) / 2)
medianFinder.addNum(3);    // arr[1, 2, 3]
medianFinder.findMedian(); // return 2.0


Constraints:

-105 <= num <= 105
There will be at least one element in the data structure before calling findMedian.
At most 5 * 104 calls will be made to addNum and findMedian.


Follow up:

If all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
If 99% of all integer numbers from the stream are in the range [0, 100], how would you optimize your solution?
*/

import {Heap} from './data-structure/Heap';

class MedianFinder {
  lowerHeap: Heap<number>;
  upperHeap: Heap<number>;
  constructor() {
    this.lowerHeap = new Heap<number>((a, b) => b - a);
    this.upperHeap = new Heap<number>((a, b) => a - b);
  }

  addNum(num: number): void {
    if (this.upperHeap.isEmpty() || num > this.upperHeap.peek()) {
      this.upperHeap.push(num);
      if (this.upperHeap.size > this.lowerHeap.size + 1) {
        this.lowerHeap.push(this.upperHeap.pop());
      }
    } else {
      this.lowerHeap.push(num);
      if (this.lowerHeap.size > this.upperHeap.size) {
        this.upperHeap.push(this.lowerHeap.pop());
      }
    }
  }

  findMedian(): number {
    return this.upperHeap.size === this.lowerHeap.size
      ? (this.lowerHeap.peek() + this.upperHeap.peek()) / 2
      : this.upperHeap.peek();
  }
}
