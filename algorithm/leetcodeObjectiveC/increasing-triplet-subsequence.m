// 334. Increasing Triplet Subsequence
// Difficulty: Medium

// Given an unsorted array return whether an increasing subsequence of length 3 exists or not in the array.

// Formally the function should:
// Return true if there exists i, j, k
// such that arr[i] < arr[j] < arr[k] given 0 ≤ i < j < k ≤ n-1 else return false.
// Your algorithm should run in O(n) time complexity and O(1) space complexity.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

BOOL increasingTriplet(NSArray* nums) {
  int a = INT_MAX, b = INT_MAX;
  for (id num in nums) {
    if ([num intValue] <= a) {
      a = [num intValue];
    } else if ([num intValue] <= b) {
      b = [num intValue];
    } else {    // a < b < num, or b < a < num
      return YES;
    }
  }
  return NO;
}
