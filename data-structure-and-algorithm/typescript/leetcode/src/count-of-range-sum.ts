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

function countRangeSum(nums, lower, upper) {
  const sum = Array(nums.length + 1).fill(0);
  for (let i = 1; i <= nums.length; ++i) {
    sum[i] = sum[i - 1] + nums[i - 1];
  }
  return mergeSort(sum);

  function mergeSort(array) {
    return sort(array, 0, array.length - 1);

    function sort(array, left, right) {
      if (left >= right) {
        return 0;
      }
      const mid = (left + right) >> 1;
      let count = sort(array, left, mid) + sort(array, mid + 1, right);
      const temp = [];
      let low = mid + 1,
        high = mid + 1;
      for (let i = left, j = mid + 1; i <= mid; ++i) {
        for (; low <= right && array[low] - array[i] < lower; ++low);
        for (; high <= right && array[high] - array[i] <= upper; ++high);
        for (; j <= right && array[j] < array[i]; ++j) {
          temp.push(array[j]);
        }
        temp.push(array[i]);
        count += high - low;
      }
      array.splice(left, temp.length, ...temp);
      return count;
    }
  }
}
