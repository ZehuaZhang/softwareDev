/*
347. Top K Frequent Elements

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

function topKFrequent(nums: number[], k: number): number[] {
  const n = nums.length;
  const map = new Map<number, number>();
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  const bkt: number[][] = [...Array(n + 1)].map(() => []);
  for (const [num, cnt] of map) {
    bkt[cnt].push(num);
  }

  const rslt: number[] = [];
  for (let j = n; j >= 0; --j) {
    for (const num of bkt[j]) {
      if (rslt.length === k) {
        return rslt;
      }
      rslt.push(num);
    }
  }

  return rslt;
}
