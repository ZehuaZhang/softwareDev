/*
229. Majority Element II

Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.

 

Example 1:

Input: nums = [3,2,3]
Output: [3]
Example 2:

Input: nums = [1]
Output: [1]
Example 3:

Input: nums = [1,2]
Output: [1,2]
 

Constraints:

1 <= nums.length <= 5 * 104
-109 <= nums[i] <= 109
 

Follow up: Could you solve the problem in linear time and in O(1) space?
*/

function majorityElement(nums: number[]): number[] {
  let [c1, c2] = [0, 1];
  let [cnt1, cnt2] = [0, 0];

  for (const n of nums) {
      if (c1 === n) {
          ++cnt1;
      } else if (c2 === n) {
          ++cnt2;
      } else if (!cnt1) {
          c1 = n;
          cnt1 = 1;
      } else if (!cnt2) {
          c2 = n;
          cnt2 = 1;
      } else {
          --cnt1;
          --cnt2;
      }
  }

  return [c1, c2].filter(n => nums.filter(num => num === n).length > nums.length / 3);
};
