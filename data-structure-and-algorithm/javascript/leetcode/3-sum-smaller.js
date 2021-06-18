/**
Given an array of n integers nums and a target, find the number of index triplets i, j, k with 0 <= i < j < k < n that satisfy the condition nums[i] + nums[j] + nums[k] < target.

Example:

Input: nums = [-2,0,1,3], and target = 2
Output: 2 
Explanation: Because there are two triplets which sums are less than 2:
             [-2,0,1]
             [-2,0,3]
*/

/**
 * 
 * @param { number[] } nums 
 * @param { number} target
 * @return { number } 
 */
function threeSumSmaller (nums, target) {
    nums.sort((a, b) => a - b);

    let result = 0;

    for (const i = 0; i < nums.length - 2; ++i) {
        for (const left = i + 1, right = nums.length - 1; left < right;) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum < target) {
                result += right - left;
                ++left;
            } else {
                --right;
            }
        }
    }

    return result;
}