// 276. Paint Fence
// Difficulty : Easy

// There is a fence with n posts, each post can be painted with one of the k colors.

// You have to paint all the posts such that no more than two adjacent fence posts have the same color.

// Return the total number of ways you can paint the fence.

// Note:
// n and k are non-negative integers.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

// DP with rolling window.

int numWays(int n, int k) {
  if (n == 0) {
    return 0;
  }
  int same = 0, diff = k, res = same + diff;
  for (int i = 2; i <= n; ++i) {
    same = diff;
    diff = res * (k - 1);
    res = same + diff;
  }
  return res;
}