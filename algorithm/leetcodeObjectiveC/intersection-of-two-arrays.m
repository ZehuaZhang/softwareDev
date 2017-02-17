// 349. Intersection of Two Arrays
// Difficulty: Easy

// Given two arrays, write a function to compute their intersection.

// Example:
// Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2].

// Time:  O(m + n)
// Space: O(m)

// Hash solution.

#import <Foundation/Foundation.h>

NSArray* intersection(NSArray* nums1, NSArray* nums2) {
  NSMutableSet* nums1set = [NSMutableSet setWithArray:nums1];
  NSMutableArray* result = @[].mutableCopy;
  for (id num2 in nums2) {
    if ([nums1set containsObject:num2]) {
      [result addObject:num2];
      [nums1set removeObject:num2];
    }
  }
  return result;
}