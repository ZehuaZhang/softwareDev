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
    return mergeSort(sum, 0, sum.length);

    function mergeSort(array, left, right) {
        if (right - left <= 1) {
            return 0;
        }
        const mid = (left + right) >> 1;
        let count = mergeSort(array, left, mid) + mergeSort(array, mid, right);
        let low = mid, high = mid, i2 = mid;
        const temp = Array(right - left).fill(0);
        for (let i1 = left, r = 0; i1 < mid; ++i1, ++r) {
            for (; high < right && array[high] - array[i1] < lower; ++high);
            for (; low < right && array[low] - array[i1] <= upper; ++low);
            while (i2 < right && array[i2] < array[i1]) {
                temp[r++] = array[i2++];
            }
            temp[r] = array[i1];
            count += low - high;
        }
        array.splice(left, i2 - left, ...temp.slice(0, i2 - left))
        return count;
    }
}