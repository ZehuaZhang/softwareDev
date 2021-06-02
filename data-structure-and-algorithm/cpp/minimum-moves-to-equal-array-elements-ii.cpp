// 462. Minimum Moves to Equal Array Elements II
// Difficulty: Medium

// Given a non-empty integer array, find the minimum number of moves required to make all array elements equal,
// where a move is incrementing a selected element by 1 or decrementing a selected element by 1.

// You may assume the array's length is at most 10,000.

// Example:

// Input:
// [1,2,3]

// Output:
// 2

// Explanation:
// Only two moves are needed (remember each move increments or decrements one element):

// [1,2,3]  =>  [2,2,3]  =>  [2,2,2]

// Time:  O(n) on average
// Space: O(1)

// Quick select solution.
class Solution {
public:
  int minMoves2(vector<int>& nums) {
    nth_element(nums.begin(), nums.begin() + nums.size() / 2, nums.end());
    const int median = nums[nums.size() / 2];
    int result = 0;
    for (const auto &num : nums) {
      result += abs(num - median);
    }
    return result;
  }
};