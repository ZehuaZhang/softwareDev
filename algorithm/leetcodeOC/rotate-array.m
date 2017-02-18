// 189. Rotate Array
// Difficulty: Easy
// Rotate an array of n elements to the right by k steps.

// For example, with n = 7 and k = 3, the array [1,2,3,4,5,6,7] is rotated to [5,6,7,1,2,3,4].

// Note:
// Try to come up as many solutions as you can, there are at least 3 different ways to solve this problem.

// Hint:
// Could you do it in-place with O(1) extra space?
// Related problem: Reverse Words in a String II

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

void rotate(NSMutableArray** nums, int k) {
  if ([*nums count]) {
    k %= [*nums count];
    
    [*nums enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      if (idx < ([*nums count] - k) / 2) {
        [*nums exchangeObjectAtIndex:idx withObjectAtIndex:[*nums count] - 1 - k - idx];
      } else if (idx >= [*nums count] - k && idx < [*nums count] - k / 2){
        [*nums exchangeObjectAtIndex:idx withObjectAtIndex:2 * [*nums count] - k - 1 - idx];
      }
    }];
    
    [*nums enumerateObjectsUsingBlock:^(id  _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
      if (idx < [*nums count] / 2) {
        [*nums exchangeObjectAtIndex:idx withObjectAtIndex:[*nums count] - 1 - idx];
      }
    }];
  }
}