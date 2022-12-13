/*
Given three integer arrays arr1, arr2 and arr3 sorted in strictly increasing order, return a sorted array of only the integers that appeared in all three arrays.



Example 1:

Input: arr1 = [1,2,3,4,5], arr2 = [1,2,5,7,9], arr3 = [1,3,4,5,8]
Output: [1,5]
Explanation: Only 1 and 5 appeared in the three arrays.


Constraints:

1 <= arr1.length, arr2.length, arr3.length <= 1000
1 <= arr1[i], arr2[i], arr3[i] <= 2000
*/

function arraysIntersection(
  nums1: number[],
  nums2: number[],
  nums3: number[]
): number[] {
  const result: number[] = [];
  for (
    let i = 0, j = 0, k = 0;
    i < nums1.length && j < nums2.length && k < nums3.length;

  ) {
    if (nums1[i] === nums2[j] && nums1[i] === nums3[k]) {
      result.push(nums1[i]);
      ++i, ++j, ++k;
    } else if (nums1[i] < nums2[j]) {
      ++i;
    } else if (nums2[j] < nums3[k]) {
      ++j;
    } else {
      ++k;
    }
  }
  return result;
}
