/*
Given an unsorted integer array nums, find the smallest missing positive integer.

You must implement an algorithm that runs in O(n) time and uses constant extra space.

 

Example 1:

Input: nums = [1,2,0]
Output: 3
Example 2:

Input: nums = [3,4,-1,1]
Output: 2
Example 3:

Input: nums = [7,8,9,11,12]
Output: 1
 

Constraints:

1 <= nums.length <= 5 * 105
-231 <= nums[i] <= 231 - 1
*/

function firstMissingPositive(nums) {
    const k = 1;
    let left = 0, right = nums.length;
    while (left < right) {
        const mid = Math.trunc((left + right) / 2);
        if (nums[mid] - (mid + 1) >= k) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    return left + k;
}