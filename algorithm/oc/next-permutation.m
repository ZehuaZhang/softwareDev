// 31. Next Permutation
// Difficulty: Medium
// Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.

// If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).

// The replacement must be in-place, do not allocate extra memory.

// Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.
// 1,2,3 → 1,3,2
// 3,2,1 → 1,2,3
// 1,1,5 → 1,5,1

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

void nextPermutation(NSMutableArray* nums) {
  if ([nums count] < 2) {
    return;
  }
  
  NSInteger i;
  // Find the first element (pivot) which is less than its successor.
  for (i = [nums count] - 2; i >= 0; i--) {
    if ([nums[i] integerValue] < [nums[i + 1] integerValue]) {
      break;
    }
  }
  
  if (i >= 0) {
    // Find the number which is first greater than pivot from reverse start, and swap it with pivot
    for (NSInteger j = [nums count] - 1; j >= i; j--) {
      if (nums[j] > nums[i]) {
        [nums exchangeObjectAtIndex:j withObjectAtIndex:i];
        break;
      }
    }
  }
  // Make the sequence after pivot non-descending
  [nums replaceObjectsInRange:NSMakeRange(i + 1, nums.length - i - 1)
         withObjectsFromArray:[[[nums subarrayWithRange:NSMakeRange(i + 1, nums.length - i - 1)] reverseObjectEnumerator] allObject]];
}