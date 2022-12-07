/*
Given a sorted integer array nums, where the range of elements are in the inclusive range [lower, upper], return its missing ranges.

Example:

Input: nums = [0, 1, 3, 50, 75], lower = 0 and upper = 99,
Output: ["2", "4->49", "51->74", "76->99"]
*/

function findMissingRanges(nums, lower, upper) {
    const result = [];
    for (let i = 0, prev = lower - 1, curr = 0; i <= nums.length; ++i, prev = curr) {
        curr = i === nums.length ? upper + 1 : nums[i];

        if (curr - prev >= 2) {
            const [left, right] = [prev + 1, curr - 1];
            result.push(left ===  right ? left.toString() : [left, right].join("->"))
        }
    }
    return result;
}