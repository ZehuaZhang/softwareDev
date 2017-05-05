// 275. H-Index II
// Difficulty: Medium

// Follow up for H-Index: What if the citations array is sorted in ascending order? Could you optimize your algorithm?

// Hint:
// Expected runtime complexity is in O(log n) and the input is sorted.

// Time:  O(logn)
// Space: O(1)

#import <Foundation/Foundation.h>

NSInteger hIndex(NSArray* citations) {
  const NSInteger n = citations.count;
  NSInteger left = 0;
  NSInteger right = n - 1;
  while (left <= right) {
    const NSInteger mid = left + (right - left) / 2;
    if ([citations[mid] integerValue] >= n - mid) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return n - left;
}
