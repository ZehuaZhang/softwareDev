/*
You are given an integer array nums that is sorted in non-decreasing order.

Determine if it is possible to split nums into one or more subsequences such that both of the following conditions are true:

Each subsequence is a consecutive increasing sequence (i.e. each integer is exactly one more than the previous integer).
All subsequences have a length of 3 or more.
Return true if you can split nums according to the above conditions, or false otherwise.

A subsequence of an array is a new array that is formed from the original array by deleting some (can be none) of the elements without disturbing the relative positions of the remaining elements. (i.e., [1,3,5] is a subsequence of [1,2,3,4,5] while [1,3,2] is not).



Example 1:

Input: nums = [1,2,3,3,4,5]
Output: true
Explanation: nums can be split into the following subsequences:
[1,2,3,3,4,5] --> 1, 2, 3
[1,2,3,3,4,5] --> 3, 4, 5
Example 2:

Input: nums = [1,2,3,3,4,4,5,5]
Output: true
Explanation: nums can be split into the following subsequences:
[1,2,3,3,4,4,5,5] --> 1, 2, 3, 4, 5
[1,2,3,3,4,4,5,5] --> 3, 4, 5
Example 3:

Input: nums = [1,2,3,4,4,5]
Output: false
Explanation: It is impossible to split nums into consecutive increasing subsequences of length 3 or more.


Constraints:

1 <= nums.length <= 104
-1000 <= nums[i] <= 1000
nums is sorted in non-decreasing order.
*/

/*
The idea is , we scan the array for two times.
In first pass we count the frequencies of all numbers and record them in cnt
For the second pass, we are "building" our subsequences by the following rules:

We use a hashmap called tails to record extra information, where tails[i] means the number of consecutive subsequences we've found so far, who are longer than 3 , and tailed by number i,
When we meet number i, try to put it to the tail of one of found subsequences tailed by i-1. No need to worry that we might have a better choice to consider i as a brand new head for another subsequence, because we can always append the new subsequence to a previous one tailed by i-1.
If we can't, it will cost one i+1 and one i+2 later to generate a new sequence. We just pay that right now by decrease cnt[i+1] and cnt[i+2]. Some one may worry that we make use of the numbers we haven't scanned so far. But actually we've already kept track of the numbers remained by cnt. Just imaging we grab the numbers needed from the very end of the string, and mark them as "used". If there is no such number available to pay, cnt will tell us by checking cnt[i+1] cnt[i+2] is positive or not
*/

function isPossible(nums) {
  const count = new Map();
  const tails = new Map();
  for (const n of nums) {
    count.set(n, (count.get(n) || 0) + 1);
  }
  for (const n of nums) {
    if (!count.get(n)) {
      continue;
    }
    count.set(n, count.get(n) - 1);
    if (tails.get(n - 1) > 0) {
      tails.set(n - 1, tails.get(n - 1) - 1);
      tails.set(n, (tails.get(n) || 0) + 1);
    } else if (count.get(n + 1) && count.get(n + 2)) {
      count.set(n + 1, count.get(n + 1) - 1);
      count.set(n + 2, count.get(n + 2) - 1);
      tails.set(n + 2, (tails.get(n + 2) || 0) + 1);
    } else {
      return false;
    }
  }
  return true;
}
