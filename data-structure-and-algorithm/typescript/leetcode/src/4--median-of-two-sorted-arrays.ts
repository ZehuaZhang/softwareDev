/*
4. Median of Two Sorted Arrays

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

 

Example 1:

Input: nums1 = [1,3], nums2 = [2]
Output: 2.00000
Explanation: merged array = [1,2,3] and median is 2.
Example 2:

Input: nums1 = [1,2], nums2 = [3,4]
Output: 2.50000
Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 

Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106
*/

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const [m, n] = [nums1.length, nums2.length];
  const k1 = Math.trunc((m + n + 1) / 2);
  const k2 = Math.trunc((m + n + 2) / 2);

  return (findK(0, 0, k1) + findK(0, 0, k2)) / 2;

  function findK(i: number, j: number, k: number) {
    if (i >= m) {
      return nums2[j + k - 1];
    }
    if (j >= n) {
      return nums1[i + k - 1];
    }
    if (k === 1) {
      return Math.min(nums1[i], nums2[j]);
    }

    const nK1 = Math.min(m - i, Math.trunc(k / 2));
    const nK2 = Math.min(n - j, Math.trunc(k / 2));
    if (nums1[i + nK1 - 1] > nums2[j + nK2 - 1]) {
      return findK(i, j + nK2, k - nK2);
    } else {
      return findK(i + nK1, j, k - nK1);
    }
  }
}
