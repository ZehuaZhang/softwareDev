/*
You may recall that an array arr is a mountain array if and only if:

arr.length >= 3
There exists some index i (0-indexed) with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
Given an integer array nums​​​, return the minimum number of elements to remove to make nums​​​ a mountain array.



Example 1:

Input: nums = [1,3,1]
Output: 0
Explanation: The array itself is a mountain array so we do not need to remove any elements.
Example 2:

Input: nums = [2,1,1,5,6,2,3,1]
Output: 3
Explanation: One solution is to remove the elements at indices 0, 1, and 5, making the array nums = [1,5,6,3,1].
Example 3:

Input: nums = [4,3,2,1,1,2,3,1]
Output: 4
Example 4:

Input: nums = [1,2,3,4,4,3,2,1]
Output: 1


Constraints:

3 <= nums.length <= 1000
1 <= nums[i] <= 109
It is guaranteed that you can make a mountain array out of nums.
*/

function minimumMountainRemovals(nums: number[]): number {
  const size = nums.length;
  const leftList = Array(size).fill(0);
  const rightList = Array(size).fill(0);
  const incSeqList: number[] = [];
  for (let i = 0; i < size; ++i) {
    const j = findGreaterEqual(incSeqList, nums[i]);
    if (incSeqList[j] === undefined) {
      incSeqList.push(nums[i]);
      leftList[i] = incSeqList.length - 1;
    } else {
      incSeqList[j] = nums[i];
      leftList[i] = j;
    }
  }
  incSeqList.splice(0);
  for (let i = size - 1; i >= 0; --i) {
    const j = findGreaterEqual(incSeqList, nums[i]);
    if (incSeqList[j] === undefined) {
      incSeqList.push(nums[i]);
      rightList[i] = incSeqList.length - 1;
    } else {
      incSeqList[j] = nums[i];
      rightList[i] = j;
    }
  }
  let result = size;
  for (let i = 1; i < size; ++i) {
    if (leftList[i] && rightList[i]) {
      result = Math.min(result, size - (leftList[i] + rightList[i] + 1));
    }
  }
  return result;

  function findGreaterEqual(nums: number[], target: number) {
    let [left, right] = [0, nums.length - 1];
    while (left <= right) {
      const mid = (left + right) >> 1;
      if (nums[mid] >= target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }
}
