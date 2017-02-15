// 287. Find the Duplicate Number
// Difficulty: Medium

// Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive),
// prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.

// Note:
// You must not modify the array (assume the array is read only).
// You must use only constant, O(1) extra space.
// Your runtime complexity should be less than O(n2).
// There is only one duplicate number in the array, but it could be repeated more than once.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

// Two pointers method, same as Linked List Cycle II

int findDuplicate(NSArray* nums) {
  int slow = [nums[0] intValue];
  int fast = [nums[[nums[0] intValue]] intValue];
  while (slow != fast) {
    slow = [nums[slow] intValue];
    fast = [nums[[nums[fast] intValue]] intValue];
  }
  slow = 0;
  while (slow != fast) {
    slow = [nums[slow] intValue];
    fast = [nums[fast] intValue];
  }
  return slow;
}
