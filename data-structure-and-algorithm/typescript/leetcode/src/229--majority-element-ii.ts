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
  let c1 = 0,
    c2 = 1,
    cnt1 = 0,
    cnt2 = 0;
  for (let num of nums) {
    if (num === c1) {
      ++cnt1;
    } else if (num === c2) {
      ++cnt2;
    } else if (cnt1 === 0) {
      c1 = num;
      cnt1 = 1;
    } else if (cnt2 === 0) {
      c2 = num;
      cnt2 = 1;
    } else {
      --cnt1;
      --cnt2;
    }
  }
  return [c1, c2].filter(
    n => nums.filter(num => num === n).length > nums.length / 3
  );
}
