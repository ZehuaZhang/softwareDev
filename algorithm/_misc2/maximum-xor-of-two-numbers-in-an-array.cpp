// 421. Maximum XOR of Two Numbers in an Array
// Difficulty: Medium

// Given a non-empty array of numbers, a0, a1, a2, … , an-1, where 0 ≤ ai < 2^31.

// Find the maximum result of ai XOR aj, where 0 ≤ i, j < n.

// Could you do this in O(n) runtime?

// Example:

// Input: [3, 10, 5, 25, 2, 8]

// Output: 28

// Explanation: The maximum result is 5 ^ 25 = 28.

// Time:  O(n)
// Space: O(n)

class Solution {
public:
  int findMaximumXOR(vector<int>& nums) {
    int result = 0;

    for (int i = 31; i >= 0; --i) {
      result <<= 1;
      unordered_set<int> prefixes;
      for (const auto& num : nums) {
        prefixes.emplace(num >> i);
      }
      for (const auto& prefix : prefixes) {
        if (prefixes.count((result | 1) ^ prefix)) {
          ++result;
          break;
        }
      }
    }
    return result;
  }
};