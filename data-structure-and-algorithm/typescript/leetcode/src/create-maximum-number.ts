/*
You are given two integer arrays nums1 and nums2 of lengths m and n respectively. nums1 and nums2 represent the digits of two numbers. You are also given an integer k.

Create the maximum number of length k <= m + n from digits of the two numbers. The relative order of the digits from the same array must be preserved.

Return an array of the k digits representing the answer.



Example 1:

Input: nums1 = [3,4,6,5], nums2 = [9,1,2,5,8,3], k = 5
Output: [9,8,6,5,3]
Example 2:

Input: nums1 = [6,7], nums2 = [6,0,4], k = 5
Output: [6,7,6,0,4]
Example 3:

Input: nums1 = [3,9], nums2 = [8,9], k = 3
Output: [9,8,9]


Constraints:

m == nums1.length
n == nums2.length
1 <= m, n <= 500
0 <= nums1[i], nums2[i] <= 9
1 <= k <= m + n
*/

/*
dp[i][j][k] is denoted as the maximum string that takes a numbers from first i numbers from A, and b numbers from first j numbers from B to create a+b = k numbers.

edge case:
if (i+j < k) then dp[i][j][k] = empty
if i = 0 or j = 0, the issue turns into 1 array
if k = 0 then dp[i][j][0] = empty
*/

function maxNumber(nums1, nums2, k) {
  const dp = [...Array(nums1.length + 1)].map(() =>
    [...Array(nums2.length + 1)].map(() => Array(k + 1).fill(''))
  );
  for (let l = 0; l <= k; ++l) {
    for (let i = 0; i <= nums1.length; ++i) {
      for (let j = 0; j <= nums2.length; ++j) {
        if (i + j < l) {
          dp[i][j][l] = 0;
        } else {
          const add1 = !i || !l ? '' : dp[i - 1][j][l - 1] + nums1[i - 1];
          const add2 = !j || !l ? '' : dp[i][j - 1][l - 1] + nums2[j - 1];
          const skip1 = !i ? '' : dp[i - 1][j][l];
          const skip2 = !j ? '' : dp[i][j - 1][l];
          const skip12 = !i || !j ? '' : dp[i - 1][j - 1][l];

          dp[i][j][l] = max(add1, add2, skip1, skip2, skip12);
        }
      }
    }
  }
  return dp[nums1.length][nums2.length][k].split('').map(s => Number(s));
}

function max(...values) {
  let result = 0;
  values.forEach((v, i) => {
    if (i) {
      result = v > result ? v : result;
    } else {
      result = v;
    }
  });
  return result;
}
