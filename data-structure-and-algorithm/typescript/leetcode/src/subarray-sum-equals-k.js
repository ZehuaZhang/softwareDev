/*
Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.

 

Example 1:

Input: nums = [1,1,1], k = 2
Output: 2
Example 2:

Input: nums = [1,2,3], k = 3
Output: 2
 

Constraints:

1 <= nums.length <= 2 * 104
-1000 <= nums[i] <= 1000
-107 <= k <= 107
*/

function subarraySum(nums, k) {
    let result = 0, sum = 0;
    const map = new Map([[0, 1]]);
    for (const n of nums) {
        sum += n;
        result += map.has(sum - k) ? map.get(sum - k) : 0;
        map.set(sum, (map.has(sum) ? map.get(sum) : 0) + 1)
    }
    return result;
}