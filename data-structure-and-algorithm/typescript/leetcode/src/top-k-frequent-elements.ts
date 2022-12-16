/*
Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.



Example 1:

Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]
Example 2:

Input: nums = [1], k = 1
Output: [1]


Constraints:

1 <= nums.length <= 105
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.


Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.
*/

function topKFrequentInArray(nums: number[], kth: number): number[] {
  const countMap = new Map<number, number>();
  for (const num of nums) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }
  const bucket: number[][] = [...Array(nums.length + 1)].map(() => []);
  for (const [num, count] of countMap.entries()) {
    bucket[count].push(num);
  }
  const result = [];
  for (let i = bucket.length - 1; i >= 0; --i) {
    for (let j = 0; j < bucket[i].length; ++j) {
      result.push(bucket[i][j]);
      if (result.length === kth) {
        return result;
      }
    }
  }
  return result;
}
