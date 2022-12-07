/**
Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.

Return the sum of the three integers.

You may assume that each input would have exactly one solution.

 

Example 1:

Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
Example 2:

Input: nums = [0,0,0], target = 1
Output: 0
Explanation: The sum that is closest to the target is 0. (0 + 0 + 0 = 0).
 

Constraints:

3 <= nums.length <= 500
-1000 <= nums[i] <= 1000
-104 <= target <= 104
*/

import { runTestCaseList } from './util/test';

function threeSumClosest(nums: number[], target: number): number {
    let result = NaN;
    let minDiff = Infinity;

    nums.sort((a, b) => a - b);

    for (let i = 0; i < nums.length - 2; ++i) {
        for (let left = i + 1, right = nums.length - 1; left < right;) {
            const sum = nums[i] + nums[left] + nums[right];
            const diff = Math.abs(sum - target);
            if (diff < minDiff) {
                minDiff = diff;
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
};

const testInputListCollection = [
    [[-1, 2, 1, -4], 1],
    [[0, 0, 0], 1]
];

const expectedResultList = [
    2,
    0
];

runTestCaseList(testInputListCollection, expectedResultList, threeSumClosest);