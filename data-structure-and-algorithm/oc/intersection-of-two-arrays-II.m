// 350. Intersection of Two Arrays II
// Difficulty: Easy

// Given two arrays, write a function to compute their intersection.

// Example:
// Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2, 2].

// Note:
// Each element in the result should appear as many times as it shows in both arrays.
// The result can be in any order.
// Follow up:
// What if the given array is already sorted? How would you optimize your algorithm?
// What if nums1's size is small compared to nums2's size? Which algorithm is better?
// What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

// If the given array is not sorted and the memory is unlimited:
//   - Time:  O(m + n)
//   - Space: O(min(m, n))
// elif the given array is already sorted:
//   if m << n or m >> n:
//     - Time:  O(min(m, n) * log(max(m, n)))
//     - Space: O(1)
//   else:
//     - Time:  O(m + n)
//     - Soace: O(1)
// else: (the given array is not sorted and the memory is limited)
//     - Time:  O(max(m, n) * log(max(m, n)))
//     - Space: O(1)

// If the given array is not sorted and the memory is unlimited.
// Time:  O(m + n)
// Space: O(min(m, n))
// Hash solution.

#import <Foundation/Foundation.h>

NSArray* intersection(NSArray* nums1, NSArray* nums2) {
  NSMutableDictionary* nums1map = @{}.mutableCopy;
  for (id num1 in nums1) {
    nums1map[num1] = @([nums1map[num1] intValue] + 1);
  }
  NSMutableArray* result = @[].mutableCopy;
  for (id num2 in nums2) {
    if (nums1map[num2] > 0) {
      [result addObject:num2];
      nums1map[num2] = @([nums1map[num2] intValue] - 1);
    }
  }
  return result;
}