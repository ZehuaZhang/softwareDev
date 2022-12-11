/*
Given an integer array nums and two integers lower and upper, return the number of range sums that lie in [lower, upper] inclusive.

Range sum S(i, j) is defined as the sum of the elements in nums between indices i and j inclusive, where i <= j.



Example 1:

Input: nums = [-2,5,-1], lower = -2, upper = 2
Output: 3
Explanation: The three ranges are: [0,0], [2,2], and [0,2] and their respective sums are: -2, -1, 2.
Example 2:

Input: nums = [0], lower = 0, upper = 0
Output: 1


Constraints:

1 <= nums.length <= 105
-231 <= nums[i] <= 231 - 1
-105 <= lower <= upper <= 105
The answer is guaranteed to fit in a 32-bit integer.
*/

function countRangeSum(nums: number[], lower: number, upper: number): number {
  const sum = Array(nums.length + 1).fill(0);
  for (let i = 1; i <= nums.length; ++i) {
    sum[i] = sum[i - 1] + nums[i - 1];
  }
  return mergeSort(0, sum.length - 1);

  function mergeSort(left: number, right: number): number {
    if (left >= right) {
      return 0;
    }
    const mid = (left + right) >> 1;
    let count = mergeSort(left, mid) + mergeSort(mid + 1, right);
    const temp: number[] = [];
    let low = mid + 1;
    let high = mid + 1;
    for (let i = left, j = mid + 1; i <= mid; ++i) {
      for (; low <= right && sum[low] - sum[i] < lower; ++low);
      for (; high <= right && sum[high] - sum[i] <= upper; ++high);
      for (; j <= right && sum[j] < sum[i]; ++j) {
        temp.push(sum[j]);
      }
      temp.push(sum[i]);
      count += high - low;
    }
    sum.splice(left, temp.length, ...temp);
    return count;
  }
}
