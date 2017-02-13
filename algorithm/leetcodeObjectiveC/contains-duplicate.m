// 217. Contains Duplicate
// Difficulty: Easy

// Given an array of integers, find if the array contains any duplicates.
// Your function should return true if any value appears at least twice in the array,
// and it should return false if every element is distinct.

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

BOOL containsDuplicate(NSArray* nums) {
  NSSet* set = [NSSet setWithArray:nums];
  return [set count] == [nums count];
}