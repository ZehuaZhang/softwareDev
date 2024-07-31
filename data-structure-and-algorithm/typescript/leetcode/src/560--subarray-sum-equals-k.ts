/*
560. Subarray Sum Equals K

Given an array of integers and an integer k, you need to find the total number of continuous subarrays whose sum equals to k.

Example 1:

Input:nums = [1,1,1], k = 2
Output: 2 

Note:

The length of the array is in range [1, 20,000].
The range of numbers in the array is [-1000, 1000] and the range of the integer k is [-1e7, 1e7].
*/

function subarraySum(nums: number[], target: number): number {
  let rslt = 0;
  let sum = 0;
  const map = new Map<number, number>([[0, 1]]);

  for (const n of nums) {
    sum += n;
    rslt += map.get(sum - target) || 0;
    map.set(sum, (map.get(sum) || 0) + 1);
  }

  return rslt;
}
