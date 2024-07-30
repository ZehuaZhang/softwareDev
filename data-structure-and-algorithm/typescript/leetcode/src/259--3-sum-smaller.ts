/**
Given an array of n integers nums and a target, find the number of index triplets i, j, k with 0 <= i < j < k < n that satisfy the condition nums[i] + nums[j] + nums[k] < target.

Example:

Input: nums = [-2,0,1,3], and target = 2
Output: 2
Explanation: Because there are two triplets which sums are less than 2:
             [-2,0,1]
             [-2,0,3]
*/

function threeSumSmaller(nums: number[], target: number): number {
  const n = nums.length;
  nums.sort((a, b) => a - b);

  let rslt = 0;

  for (let i = 0; i < n - 2; ++i) {
    for (let l = i + 1, r = n - 1; l < r; ) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum < target) {
        rslt += r - l;
        ++l;
      } else {
        --r;
      }
    }
  }

  return rslt;
}
