// 440. K-th Smallest in Lexicographical Order
// Difficulty: Hard

// Given integers n and k, find the lexicographically k-th smallest integer in the range from 1 to n.

// Note: 1 ≤ k ≤ n ≤ 10^9.

// Example:

// Input:
// n: 13   k: 2

// Output:
// 10

// Explanation:
// The lexicographical order is [1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9], so the second smallest number is 10.

// Time:  O(logn)
// Space: O(logn)

class Solution {
public:
  int findKthNumber(int n, int k) {
    int cur = 1;
    --k;
    while (k > 0) {
      long long step = 0;
      for (long long first = cur, last = cur + 1; first <= n; first *= 10, last *= 10) {
        step += min((long long)n + 1, last) - first;
      }
      if (step <= k) {
        ++cur;
        k -= step;
      } else {
        cur *= 10;
        --k; 
      }
    }
    return cur;
  }
};