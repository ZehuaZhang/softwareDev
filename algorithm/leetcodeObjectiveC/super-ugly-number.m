// 313. Super Ugly Number
// Difficulty: Medium

// Write a program to find the nth super ugly number.

// Super ugly numbers are positive numbers whose all prime factors are in the given prime list primes of size k.
// For example, [1, 2, 4, 7, 8, 13, 14, 16, 19, 26, 28, 32] is the sequence of the first 12 super ugly numbers
// given primes = [2, 7, 13, 19] of size 4.

// Note:
// (1) 1 is a super ugly number for any given primes.
// (2) The given numbers in primes are in ascending order.
// (3) 0 < k ≤ 100, 0 < n ≤ 106, 0 < primes[i] < 1000.

// Time:  O(n * k)
// Space: O(n + k)
// DP solution. (596ms)

#import <Foundation/Foundation.h>

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

int nthSuperUglyNumber(int n, NSArray* primes) {
  int uglies[n], idxFactor[primes.count];
  NSMutableArray* factors = [primes mutableCopy];
  uglies[0] = 1;
  
  for (int i = 1; i < n; ++i) {
    uglies[i] = findKthSmallest(factors, 1);
    for (int k = 0; k < primes.count; ++k) {
      if (uglies[i] == [factors[k] intValue]) {
        factors[k] = @([primes[k] intValue] * uglies[++idxFactor[k]]);
      }
    }
  }
  
  return uglies[n - 1];
}