/*
Given an integer array nums and an integer k, return true if it is possible to divide this array into k non-empty subsets whose sums are all equal.



Example 1:

Input: nums = [4,3,2,3,5,2,1], k = 4
Output: true
Explanation: It's possible to divide it into 4 subsets (5), (1, 4), (2,3), (2,3) with equal sums.
Example 2:

Input: nums = [1,2,3,4], k = 3
Output: false


Constraints:

1 <= k <= nums.length <= 16
1 <= nums[i] <= 104
The frequency of each element is in the range [1, 4].
*/

function canPartitionKSubsets(nums: number[], count: number): boolean {
  const sum = nums.reduce((p, c) => p + c, 0);
  if (sum % count) {
    return false;
  }
  const visited: boolean[] = Array(nums.length).fill(false);
  return canPartitionKSubsetsDfs(sum / count, count, 0, 0);

  function canPartitionKSubsetsDfs(
    target: number,
    count: number,
    start: number,
    sum: number
  ): boolean {
    if (sum > target) {
      return false;
    }

    if (sum === target) {
      if (count === 1) {
        return true;
      }
      return canPartitionKSubsetsDfs(target, count - 1, 0, 0);
    }
    for (let i = start; i < nums.length; ++i) {
      if (!visited[i]) {
        visited[i] = true;
        if (canPartitionKSubsetsDfs(target, count, i + 1, sum + nums[i])) {
          return true;
        }
        visited[i] = false;
      }
    }
    return false;
  }
}
