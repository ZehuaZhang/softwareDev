// 215. Kth Largest Element in an Array
// Difficulty: Medium

// Find the kth largest element in an unsorted array.

// Note that it is the kth largest element in the sorted order, not the kth distinct element.

// For example,
// Given [3,2,1,5,6,4] and k = 2, return 5.

// Note:
// You may assume k is always valid, 1 ≤ k ≤ array length.

// Time:  O(n) ~ O(n^2)
// Space: O(1)

#import <Foundation/Foundation.h>

NSInteger PartitionAroundPivot(NSInteger left, NSInteger right, NSInteger pivotIdx, NSMutableArray* nums) {
  [nums exchangeObjectAtIndex:pivotIdx withObjectAtIndex:right];
  int pivot = [nums[right] intValue];
  NSInteger newPivotIdx = left;
  for (NSInteger i = left; i < right; ++i) {
    if ([nums[i] intValue] > pivot) {
      [nums exchangeObjectAtIndex:newPivotIdx++ withObjectAtIndex:i];
    }
  }
  [nums exchangeObjectAtIndex:newPivotIdx withObjectAtIndex:right];
  return newPivotIdx;
}

int findKthLargest(NSMutableArray* nums, int k) {
  NSInteger left = 0, right = [nums count] - 1;
  while (left <= right) {
    NSInteger pivotIdx = left + rand() % (right - left + 1);
    NSInteger newPivotIdx = PartitionAroundPivot(left, right, pivotIdx, nums);
    if (newPivotIdx == k - 1) {
      return [nums[newPivotIdx] intValue];
    } else if (newPivotIdx > k - 1) {
      right = newPivotIdx - 1;
    } else {
      left = newPivotIdx + 1;
    }
  }
  return [nums[left] intValue];
}
