// 347. Top K Frequent Elements
// Difficulty: Medium

// Given a non-empty array of integers, return the k most frequent elements.

// For example,
// Given [1,1,1,2,2,3] and k = 2, return [1,2].

// Note:
// You may assume k is always valid, 1 ≤ k ≤ number of unique elements.
// Your algorithm time complexity must be better than O(n log n), where n is the array size.

// Time:  O(nlogk)
// Space: O(n)
// Heap solution.

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

NSArray* topKFrequent(NSArray* nums, int k) {
  NSMutableDictionary* counts = @{}.mutableCopy;
  for (int i = 0; i < nums.count; ++i) {
    counts[nums[i]] = @([counts[nums[i]] intValue] + 1);
  }
  PriorityQueue* heap = [[PriorityQueue alloc] init];
  for (id key in counts) {
    [heap push:@[counts[key], key]];
    if ([heap count] == k + 1) {
      [heap pop];
    }
  }
  NSMutableArray* result = @[].mutableCopy;
  while (![heap isEmpty]) {
    [result addObject:[heap pop][1]];
  }
  return result;
}