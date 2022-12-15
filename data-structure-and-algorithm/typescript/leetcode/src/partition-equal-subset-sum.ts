/*
Given a non-empty array nums containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.



Example 1:

Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].
Example 2:

Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.


Constraints:

1 <= nums.length <= 200
1 <= nums[i] <= 100
*/

function canPartition(nums: number[]): boolean {
  const sum = nums.reduce((p, c) => p + c, 0);
  if (sum & 1) {
    return false;
  }
  const target = sum >> 1;
  const result: boolean[] = Array(target + 1).fill(false);
  result[0] = true;
  for (const num of nums) {
    for (let i = target; i >= num; --i) {
      result[i] ||= result[i - num];
    }
  }
  return result[target];
}

function canPartitionDfs(nums: number[]): boolean {
  const sum = nums.reduce((p, c) => p + c, 0);
  if (sum & 1) {
    return false;
  }
  const target = sum >> 1;
  const cache: (boolean | undefined)[][] = [...Array(nums.length + 1)].map(() =>
    Array(target + 1).fill(undefined)
  );
  return canPartitionDfsHelper(target, nums.length - 1);

  function canPartitionDfsHelper(target: number, i: number): boolean {
    if (i < 0 || target < 0) {
      return false;
    }
    if (target === 0) {
      return (cache[i][target] = true);
    }
    if (cache[i][target] !== undefined) {
      return cache[i][target]!;
    }

    cache[i][target] =
      canPartitionDfsHelper(target, i - 1) ||
      canPartitionDfsHelper(target - nums[i], i - 1);
    return cache[i][target]!;
  }
}
