/*
Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in O(n) time.



Example 1:

Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
Example 2:

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9


Constraints:

0 <= nums.length <= 105
-109 <= nums[i] <= 109
*/

function longest(nums: number[]): number {
  let result = 0;
  const set = new Set(nums);
  for (const num of nums) {
    if (!set.has(num)) {
      continue;
    }
    set.delete(num);
    let [left, right] = [num - 1, num + 1];
    for (; set.has(left); --left) {
      set.delete(left);
    }
    for (; set.has(right); ++right) {
      set.delete(right);
    }
    result = Math.max(result, right - left - 1);
  }
  return result;
}
