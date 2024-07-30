/*
128. Longest Consecutive Sequence

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

function longestConsecutive(nums: number[]): number {
  const set = new Set(nums);

  let rslt = 0;

  for (const num of nums) {
    if (set.has(num)) {
      set.delete(num);

      let [l, r] = [num - 1, num + 1];

      for (; set.has(l); --l) {
        set.delete(l);
      }
      for (; set.has(r); ++r) {
        set.delete(r);
      }

      rslt = Math.max(rslt, r - l - 1);
    }
  }

  return rslt;
}
