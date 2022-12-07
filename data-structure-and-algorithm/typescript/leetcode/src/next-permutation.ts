/*
Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order).

The replacement must be in place and use only constant extra memory.



Example 1:

Input: nums = [1,2,3]
Output: [1,3,2]
Example 2:

Input: nums = [3,2,1]
Output: [1,2,3]
Example 3:

Input: nums = [1,1,5]
Output: [1,5,1]
Example 4:

Input: nums = [1]
Output: [1]


Constraints:

1 <= nums.length <= 100
0 <= nums[i] <= 100
*/

function nextPermutation(nums) {
  let k;
  for (k = nums.length - 2; k >= 0 && nums[k] >= nums[k + 1]; --k);
  if (k < 0) {
    nums.reverse();
  } else {
    let p;
    for (p = nums.length - 1; p > k && nums[p] <= nums[k]; --p);
    const swap = nums[p];
    nums[p] = nums[k];
    nums[k] = swap;
    nums.splice(k + 1, nums.length, ...nums.slice(k + 1).reverse());
  }
}
