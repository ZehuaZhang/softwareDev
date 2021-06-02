// 259. 3Sum Smaller
// Difficulty : Medium

// Given an array of n integers nums and a target, find the number of index triplets i, j, k with 0 <= i < j < k < n
// that satisfy the condition nums[i] + nums[j] + nums[k] < target.

// For example, given nums = [-2, 0, 1, 3], and target = 2.

// Return 2. Because there are two triplets which sums are less than 2:

// [-2, 0, 1]
// [-2, 0, 3]
// Follow up:
// Could you solve it in O(n2) runtime?

// Time:  O(n^2)
// Space: O(1)

#import <Foundation/Foundation.h>

int threeSumSmaller(NSArray* nums, int target) {
  NSArray* sorted = [nums sortedArrayUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    return [obj1 compare:obj2];
  }];
  int count = 0;
  for (int k = 2; k < [sorted count]; ++k) {
    int i = 0, j = k - 1;
    while (i < j) {  // Two Pointers, linear time.
      if ([sorted[i] intValue] + [sorted[j] intValue] + [sorted[k] intValue] >= target) {
        --j;
      } else {
        count += j - i;
        ++i;
      }
    }
  }
  return count;
}
