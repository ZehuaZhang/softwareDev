// 378. Kth Smallest Element in a Sorted Matrix
// Difficulty: Medium

// Given a n x n matrix where each of the rows and columns are sorted in ascending order, find the kth smallest element in the matrix.

// Note that it is the kth smallest element in the sorted order, not the kth distinct element.

// Example:

// matrix = [
//    [ 1,  5,  9],
//    [10, 11, 13],
//    [12, 13, 15]
// ],
// k = 8,

// return 13.
// Note:
// You may assume k is always valid, 1 ≤ k ≤ n2.

// Time:  O(k * log(min(n, m, k))), with m x n matrix
// Space: O(min(n, m, k))

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

int kthSmallest(NSArray* matrix, int k) {
  int kthSmallest = 0;
  PriorityQueue* minHeap = [[PriorityQueue alloc] init];
  [minHeap push:@[matrix[0][0], @(0), @(0)]];
   
  while (![minHeap isEmpty] && k--) {
    NSArray* top = [minHeap pop];
    kthSmallest = [top[0] intValue];
    [minHeap push:@[matrix[[top[1] intValue]][[top[2] intValue] + 1], top[1], @([top[2] intValue] + 1)]];
    if ([top[2] intValue] == 0) {
      [minHeap push:@[matrix[[top[1] intValue] + 1][0], @([top[1] intValue] + 1), @0]];
    }
  }
  return kthSmallest;
}