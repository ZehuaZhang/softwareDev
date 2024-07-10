/*
84. Largest Rectangle in Histogram

Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

 

Example 1:


Input: heights = [2,1,5,6,2,3]
Output: 10
Explanation: The above is a histogram where width of each bar is 1.
The largest rectangle is shown in the red area, which has an area = 10 units.
Example 2:


Input: heights = [2,4]
Output: 4
 

Constraints:

1 <= heights.length <= 105
0 <= heights[i] <= 104
*/

function largestRectangleArea(heights: number[]): number {
  const h = [...heights, 0];
  const idx: number[] = [];
  let rslt = 0;

  for (let i = 0; i < h.length;) {
      if (!idx.length || h[i] > h[idx[idx.length - 1]]) {
          idx.push(i++);
      } else {
          const l = h[idx.pop()];
          const w = idx.length ? i - idx[idx.length - 1] - 1 : i;
          rslt = Math.max(rslt, l * w);
      }
  }

  return rslt;
}
