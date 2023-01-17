/*
84. Largest Rectangle in Histogram
Difficulty: Hard

Given n non-negative integers representing the histogram bar height where the width of each bar is 1,
find the area of largest rectangle in the histogram.

For example,
Given heights = [1,3,2,4],
return 6.

|
|            __
|      __   |  |
|     |  |__|  |
|   __|  |  |  |
|__|__|__|__|__|___


Time:  O(n)
Space: O(n)
*/

import {Stack} from './data-structure/Stack';

function largestRectangleArea(heights: number[]): number {
  const list = [...heights, 0];
  const idx = new Stack<number>();
  let result = 0;

  for (let i = 0; i < list.length; ) {
    if (idx.isEmpty() || list[i] > list[idx.peek()]) {
      idx.push(i++);
    } else {
      const height = list[idx.pop()];
      const len = idx.isEmpty() ? i : i - idx.peek() - 1;
      result = Math.max(result, height * len);
    }
  }
  return result;
}
