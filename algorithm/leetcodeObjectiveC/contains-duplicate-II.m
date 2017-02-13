// 219. Contains Duplicate II
// Difficulty: Easy

// Given an array of integers and an integer k, find out whether there are two distinct indices i and j in the array such that nums[i] = nums[j]
// and the difference between i and j is at most k

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

  BOOL containsNearbyDuplicate(NSArray* nums, int k) {
    NSMutableDictionary* index = @{}.mutableCopy;
    for (int i = 0; i < [nums count]; ++i) {
      if (index[nums[i]]) {
        if (i - [index[nums[i]] intValue] <= k) {
          return YES;
        }
      }
      index[nums[i]] = @(i);
    }
    return NO;
  }