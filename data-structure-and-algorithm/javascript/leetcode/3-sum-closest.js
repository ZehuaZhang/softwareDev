/**
Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.

 

Example 1:

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
 

Constraints:

3 <= nums.length <= 10^3
-10^3 <= nums[i] <= 10^3
-10^4 <= target <= 10^4
*/

/**
 * 
 * @param { number[] } nums
 * @param { number } target
 * @return { number } 
 */
function threeSumClosest(nums, target) {
    let result = NaN;
    const diff = Number.MIN_VALUE;

    nums.sort((a, b) => a - b);

    for (const i = 0; i < nums.length - 2; ++i) {
        for (const left = i + 1, right = nums.length - 1; left < right;) {
            const sum = nums[i] + nums[left] + nums[right];
            const currDiff = Math.abs(sum - target);
            if (currDiff < diff) {
                diff = currDiff;
                result = sum;
            }
            if (sum < target) {
                ++left;
            } else if (sum > target) {
                --right;
            } else {
                return result;
            }
        }
    }

    return result;
}