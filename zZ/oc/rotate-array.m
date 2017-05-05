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
    NSArray* array1= [[[*nums subarrayWithRange:NSMakeRange(0, [*nums length] - k)] reverseObjectEnumerator] allObject];
    NSArray* array2 = [[[*nums subarrayWithRange:NSMakeRange([*nums length] - k), k] reverseObjectEnumerator] allObject];
    *nums = [[[array1 arrayByAddObjectsFromArray:array2] reverseObjectEnumerator] allObject];
  }
}