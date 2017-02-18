// 373. Find K Pairs with Smallest Sums
// Difficulty: Medium

// You are given two integer arrays nums1 and nums2 sorted in ascending order and an integer k.

// Define a pair (u,v) which consists of one element from the first array and one element from the second array.

// Find the k pairs (u1,v1),(u2,v2) ...(uk,vk) with the smallest sums.

// Example 1:
// Given nums1 = [1,7,11], nums2 = [2,4,6],  k = 3
// Return: [1,2],[1,4],[1,6]

// The first 3 pairs are returned from the sequence:
// [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]

// Example 2:
// Given nums1 = [1,1,2], nums2 = [1,2,3],  k = 2
// Return: [1,1],[1,1]

// The first 2 pairs are returned from the sequence:
// [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]

// Example 3:
// Given nums1 = [1,2], nums2 = [3],  k = 3
// Return: [1,3],[2,3]

// All possible pairs are returned from the sequence:
// [1,3],[2,3]

// Time:  O(k * k * logk)
// Space: O(k)

#import <Foundation/Foundation.h>

#pragma mark PriorityQueue

@interface PriorityQueue : NSObject

- (instancetype)initIsMinHeap:(BOOL)isMinHeap;
- (instancetype)init;
- (id)top;
- (id)pop;
- (void)push:(id)element;
-(NSInteger)count;
- (BOOL)isEmpty;

@end

#pragma mark Solution

NSArray* kSmallestPairs(NSArray* nums1, NSArray* nums2, int k) {
  NSMutableArray* res = @[].mutableCopy;
  PriorityQueue* maxHeap = [[PriorityQueue alloc] init];
  for (int i = 0; i < MIN(nums1.count, k); ++i) {
    for (int j = 0; j < MIN(nums2.count, k); ++j) {
      if (maxHeap.count < k) {
        [maxHeap push:@[@([nums1[i] intValue] + [nums2[j] intValue]), nums1[i], nums2[j]]];
      } else if ([nums1[i] intValue] + [nums2[j] intValue] < [[maxHeap top][0] intValue]) {
        [maxHeap push:@[@([nums1[i] intValue] + [nums2[j] intValue]), nums1[i], nums2[j]]];
        [maxHeap pop];
      }
    }
  }
  while (![maxHeap isEmpty]) {
    [res addObject:@[[maxHeap top][1], [maxHeap top][2]]];
  }
  return res;
}