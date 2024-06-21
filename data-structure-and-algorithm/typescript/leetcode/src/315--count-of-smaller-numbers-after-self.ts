/*
315. Count of Smaller Numbers After Self

You are given an integer array nums and you have to return a new counts array. The counts array has the property where counts[i] is the number of smaller elements to the right of nums[i].



Example 1:

Input: nums = [5,2,6,1]
Output: [2,1,1,0]
Explanation:
To the right of 5 there are 2 smaller elements (2 and 1).
To the right of 2 there is only 1 smaller element (1).
To the right of 6 there is 1 smaller element (1).
To the right of 1 there is 0 smaller element.
Example 2:

Input: nums = [-1]
Output: [0]
Example 3:

Input: nums = [-1,-1]
Output: [0,0]


Constraints:

1 <= nums.length <= 105
-104 <= nums[i] <= 104
*/

function countSmaller(nums: number[]): number[] {
  const numIdx: number[][] = [];
  for (let i = 0; i < nums.length; ++i) {
    numIdx.push([nums[i], i]);
  }
  const result = Array(nums.length).fill(0);
  mergeSort(0, numIdx.length - 1);
  return result;

  function mergeSort(left: number, right: number): void {
    if (left >= right) {
      return;
    }
    const mid = (left + right) >> 1;
    mergeSort(left, mid);
    mergeSort(mid + 1, right);
    const temp = [];
    for (let i = left, j = mid + 1; i <= mid; ++i) {
      for (; j <= right && numIdx[j][0] < numIdx[i][0]; ++j) {
        temp.push(numIdx[j]);
      }
      temp.push(numIdx[i]);
      result[numIdx[i][1]] += j - (mid + 1);
    }
    numIdx.splice(left, temp.length, ...temp);
  }
}
