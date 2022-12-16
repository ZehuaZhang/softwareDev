/*
The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value. So the median is the mean of the two middle values.

For examples, if arr = [2,3,4], the median is 3.
For examples, if arr = [1,2,3,4], the median is (2 + 3) / 2 = 2.5.
You are given an integer array nums and an integer k. There is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.

Return the median array for each window in the original array. Answers within 10-5 of the actual value will be accepted.



Example 1:

Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [1.00000,-1.00000,-1.00000,3.00000,5.00000,6.00000]
Explanation:
Window position                Median
---------------                -----
[1  3  -1] -3  5  3  6  7        1
1 [3  -1  -3] 5  3  6  7       -1
1  3 [-1  -3  5] 3  6  7       -1
1  3  -1 [-3  5  3] 6  7        3
1  3  -1  -3 [5  3  6] 7        5
1  3  -1  -3  5 [3  6  7]       6
Example 2:

Input: nums = [1,2,3,4,2,3,1,4,2], k = 3
Output: [2.00000,3.00000,3.00000,3.00000,2.00000,3.00000,2.00000]


Constraints:

1 <= k <= nums.length <= 105
231 <= nums[i] <= 231 - 1
*/

import {Heap} from './data-structure/Heap';

function medianSlidingWindow(nums: number[], size: number): number[] {
  const window = new Window();
  for (let i = 0; i < size - 1; ++i) {
    window.push(nums[i]);
  }
  const result: number[] = [];
  for (let i = size - 1; i < nums.length; ++i) {
    window.push(nums[i]);
    result.push(window.median());
    window.remove(nums[i - size + 1]);
  }
  return result;
}

class Window {
  lowerHeap: Heap<number>;
  upperHeap: Heap<number>;
  constructor() {
    this.upperHeap = new Heap((a, b) => a - b);
    this.lowerHeap = new Heap((a, b) => b - a);
  }

  push(data: number): void {
    this.heap(data).push(data);
    this.balance();
  }

  remove(data: number): void {
    this.heap(data).remove(data);
    this.balance();
  }

  median(): number {
    if (this.upperHeap.size === this.lowerHeap.size) {
      return (this.upperHeap.peek() + this.lowerHeap.peek()) / 2;
    }
    return this.upperHeap.peek();
  }

  heap(data: number): Heap<number> {
    return data < this.median() ? this.lowerHeap : this.upperHeap;
  }

  balance(): void {
    const diff = this.lowerHeap.size - this.upperHeap.size;
    if (diff > 0) {
      this.upperHeap.push(this.lowerHeap.pop());
    } else if (diff < -1) {
      this.lowerHeap.push(this.upperHeap.pop());
    }
  }
}
