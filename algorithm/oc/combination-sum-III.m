// 216. Combination Sum III
// Difficulty: Medium

// Find all possible combinations of k numbers that add up to a number n,
// given that only numbers from 1 to 9 can be used and each combination should be a unique set of numbers.


// Example 1:
// Input: k = 3, n = 7

// Output:
// [[1,2,4]]

// Example 2:
// Input: k = 3, n = 9

// Output:
// [[1,2,6], [1,3,5], [2,3,4]]

// Time:  O(k * C(n, k))
// Space: O(k)

#import <Foundation/Foundation.h>

void combinationSum3DFS(int k, int n, int level, NSMutableArray** path, NSMutableArray** res) {
  if (n < 0) {
    return;
  }
  if (n == 0 && [*path count] == k) {
    [*res addObject:[*path copy]];
  }
  for (int i = level; i <= 9; ++i) {
    [*path addObject: @(i)];
    combinationSum3DFS(k, n - i, i + 1, path, res);
    [*path removeLastObject];
  }
}

NSArray* combinationSum3(int k, int n) {
  NSMutableArray* res = @[].mutableCopy;
  NSMutableArray* path = @[].mutableCopy;
  combinationSum3DFS(k, n, 1, &path, &res);
  return res;
}
