/**
Given an integer array nums, return the number of all the arithmetic subsequences of nums.

A sequence of numbers is called arithmetic if it consists of at least three elements and if the difference between any two consecutive elements is the same.

For example, [1, 3, 5, 7, 9], [7, 7, 7, 7], and [3, -1, -5, -9] are arithmetic sequences.
For example, [1, 1, 2, 5, 7] is not an arithmetic sequence.
A subsequence of an array is a sequence that can be formed by removing some elements (possibly none) of the array.

For example, [2,5,10] is a subsequence of [1,2,1,2,4,1,5,10].
The answer is guaranteed to fit in 32-bit integer.

Example 1:

Input: nums = [2,4,6,8,10]
Output: 7
Explanation: All arithmetic subsequence slices are:
[2,4,6]
[4,6,8]
[6,8,10]
[2,4,6,8]
[4,6,8,10]
[2,4,6,8,10]
[2,6,10]
Example 2:

Input: nums = [7,7,7,7,7]
Output: 16
Explanation: Any subsequence of this array is arithmetic.

Constraints:
1  <= nums.length <= 1000
-231 <= nums[i] <= 231 - 1
*/

// method - dynamic programming
function numberOfArithmeticSlicesDP(nums: number[]): number {
  let result = 0;

  // count that ends with number array index and difference
  const diffCountMap = [...Array(nums.length)].map(
    () => new Map<number, number>()
  );
  for (let i = 1; i < nums.length; ++i) {
    for (let j = 0; j < i; ++j) {
      const diff = nums[i] - nums[j];
      const countJ = diffCountMap[j].get(diff) || 0;
      const countI = diffCountMap[i].get(diff) || 0;
      diffCountMap[i].set(diff, countI + countJ + 1);
      result += countJ;
    }
  }
  return result;
}

// method - dfs
function numberOfArithmeticSlicesDFS(nums: number[]): number {
  let result = 0;
  const path: number[] = [];
  numberOfArithmeticSlicesDFSHelper(nums, path, 0);
  return result;

  function numberOfArithmeticSlicesDFSHelper(
    nums: number[],
    path: number[],
    start: number
  ) {
    for (let i = start; i < nums.length; ++i) {
      if (
        path.length < 2 ||
        nums[i] - path[path.length - 1] ===
          path[path.length - 1] - path[path.length - 2]
      ) {
        path.push(nums[i]);
        numberOfArithmeticSlicesDFSHelper(nums, path, i + 1);
        path.pop();
      }
    }

    if (path.length >= 3) {
      ++result;
      return;
    }
  }
}
