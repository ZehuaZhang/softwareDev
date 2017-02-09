// 77. Combinations
// Difficulty: Medium

// Given two integers n and k, return all possible combinations of k numbers out of 1 ... n.

// For example,
// If n = 4 and k = 2, a solution is:

// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]

// Time : O(n!)
// Space: O(n)

#import <Foundation/Foundation.h>

void combineHelper(int n, int k, int start, NSMutableArray** path, NSMutableArray** ans) {
  if (k == 0) {
    [*ans addObject:*path];
    return;
  }
  
  for(int i = start; i <= n; ++i) {
    [*path addObject:@(i)];
    combineHelper(n, k - 1, i + 1, path, ans);
    [*path removeLastObject];
  }
}


NSArray* combine(int n, int k) {
  NSMutableArray* ans = [NSMutableArray array];
  NSMutableArray* path = [NSMutableArray array];
  combineHelper(n, k, 1, &path, &ans);
  return ans;
}
