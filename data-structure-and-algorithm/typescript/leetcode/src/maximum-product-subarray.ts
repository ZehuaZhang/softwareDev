/*
152. Maximum Product Subarray
Difficulty: Medium

Find the contiguous subarray within an array (containing at least one number) which has the largest product.

For example, given the array [2,3,-2,4],
the contiguous subarray [2,3] has the largest product = 6.
*/

function maxProduct(nums: number[]): number {
  let result = -Infinity;
  let max = 1;
  let min = 1;
  for (const num of nums) {
    const [prevMax, prevMin] = [max, min];
    max = Math.max(num, Math.max(prevMax * num, prevMin * num));
    min = Math.min(num, Math.min(prevMax * num, prevMin * num));
    result = Math.max(result, max);
  }
  return result;
}
