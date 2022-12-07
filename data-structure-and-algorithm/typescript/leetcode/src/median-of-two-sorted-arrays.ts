/*
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
Example 3:

Input: nums1 = [0,0], nums2 = [0,0]
Output: 0.00000
Example 4:

Input: nums1 = [], nums2 = [1]
Output: 1.00000
Example 5:

Input: nums1 = [2], nums2 = []
Output: 2.00000


Constraints:

nums1.length == m
nums2.length == n
0 <= m <= 1000
0 <= n <= 1000
1 <= m + n <= 2000
-106 <= nums1[i], nums2[i] <= 106
*/

/**
 * @param { number[] } nums1
 * @param { number[] } nums2
 * @return { number }
 */
function findMedianSortedArrays(nums1, nums2) {
  const k1 = (nums1.length + nums2.length + 1) >> 1;
  const k2 = (nums1.length + nums2.length + 2) >> 1;

  return (
    (findKth(nums1, 0, nums2, 0, k1) + findKth(nums1, 0, nums2, 0, k2)) / 2
  );
}

function findKth(nums1, i1, nums2, i2, k) {
  if (i1 >= nums1.length) {
    return nums2[i2 + k - 1];
  }
  if (i2 >= nums2.length) {
    return nums1[i1 + k - 1];
  }
  if (k === 1) {
    return Math.min(nums1[i1], nums2[i2]);
  }

  const k1 = Math.min(nums1.length - i1, k >> 1);
  const k2 = Math.min(nums2.length - i2, k >> 1);
  if (nums1[i1 + k1 - 1] > nums2[i2 + k2 - 1]) {
    return findKth(nums1, i1, nums2, i2 + k2, k - k2);
  } else {
    return findKth(nums1, i1 + k1, nums2, i2, k - k1);
  }
}
