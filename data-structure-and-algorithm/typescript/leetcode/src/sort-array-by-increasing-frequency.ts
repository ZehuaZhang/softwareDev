/*
Given an array of integers nums, sort the array in increasing order based on the frequency of the values. If multiple values have the same frequency, sort them in decreasing order.

Return the sorted array.



Example 1:

Input: nums = [1,1,2,2,2,3]
Output: [3,1,1,2,2,2]
Explanation: '3' has a frequency of 1, '1' has a frequency of 2, and '2' has a frequency of 3.
Example 2:

Input: nums = [2,3,1,3,2]
Output: [1,3,3,2,2]
Explanation: '2' and '3' both have a frequency of 2, so they are sorted in decreasing order.
Example 3:

Input: nums = [-1,1,-6,4,5,-6,1,4,1]
Output: [5,-1,4,4,-6,-6,1,1,1]


Constraints:

1 <= nums.length <= 100
-100 <= nums[i] <= 100
*/

function frequencySort(nums) {
  const count = new Map();
  for (const n of nums) {
    count.set(n, (count.has(n) ? count.get(n) : 0) + 1);
  }
  const bucket = [...Array(nums.length + 1)].map(() => []);
  for (let n = -100; n <= 100; ++n) {
    if (count.has(n)) {
      bucket[count.get(n)].push(n);
    }
  }
  const result = [];
  for (let i = 1; i < bucket.length; ++i) {
    for (let j = bucket[i].length - 1; j >= 0; --j) {
      result.push(...Array(i).fill(bucket[i][j]));
    }
  }
  return result;
}
