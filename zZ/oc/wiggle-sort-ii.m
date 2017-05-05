// 324. Wiggle Sort II
// Difficulty : Medium

// Given an unsorted array nums, reorder it such that nums[0] < nums[1] > nums[2] < nums[3]....

// Example:
// (1) Given nums = [1, 5, 1, 1, 6, 4], one possible answer is [1, 4, 1, 5, 1, 6].
// (2) Given nums = [1, 3, 2, 2, 3, 1], one possible answer is [2, 3, 1, 3, 1, 2].

// Note:
// You may assume all input has valid answer.

// Follow Up:
// Can you do it in O(n) time and/or in-place with O(1) extra space?

// Time:  O(n) ~ O(n^2), O(n) on average.
// Space: O(1)

#import <Foundation/Foundation.h>

// Tri Partition (aka Dutch National Flag Problem) with virtual index solution.

#define I ((1 + 2 * (I)) % N)

NSInteger PartitionAroundPivot(NSInteger left, NSInteger right, NSInteger pivotIdx, NSMutableArray* nums) {
  [nums exchangeObjectAtIndex:pivotIdx withObjectAtIndex:right];
  int pivot = [nums[right] intValue];
  NSInteger newPivotIdx = left;
  for (NSInteger i = left; i < right; ++i) {
    if ([nums[i] intValue] < pivot) {
      [nums exchangeObjectAtIndex:newPivotIdx++ withObjectAtIndex:i];
    }
  }
  [nums exchangeObjectAtIndex:newPivotIdx withObjectAtIndex:right];
  return newPivotIdx;
}

int findKthSmallest(NSMutableArray* nums, int k) {
  NSInteger left = 0, right = [nums count] - 1;
  while (left <= right) {
    NSInteger pivotIdx = left + arc4random_uniform((int)(right - left + 1));
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

NSInteger indexChange(NSInteger i, NSInteger n) {
  return (2 * i + 1) % n;
}

void reversedTriPartitionWithVI(NSMutableArray* nums, int value) {
  const NSInteger N = nums.count / 2 * 2 + 1;
  // put after tri-partition
  // put small numbers, from [mid, 0] to even positions starting 0
  // put large numbers, from [nums.size() - 1, 0] to odd positions starting 1
  
  for (NSInteger i = 0, j = 0, n = nums.count - 1; j <= n;) {
    if ([nums[indexChange(j, N)] intValue] > value) {
      [nums exchangeObjectAtIndex:indexChange(i++, N) withObjectAtIndex:indexChange(j++, N)];
    } else if ([nums[indexChange(j, N) ] intValue] < value) {
      [nums exchangeObjectAtIndex:indexChange(n--, N) withObjectAtIndex:indexChange(j, N)];
    } else {
      ++j;
    }
  }
}

void wiggleSort(NSMutableArray* nums) {
  NSInteger mid = (nums.count - 1) / 2;
  findKthSmallest(nums, (int)mid);
  reversedTriPartitionWithVI(nums, [nums[mid] intValue]);  // O(n) time, O(1) space
}

