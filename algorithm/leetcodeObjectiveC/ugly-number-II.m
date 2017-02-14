// 264. Ugly Number II
// Difficulty: Medium

// Write a program to find the n-th ugly number.

// Ugly numbers are positive numbers whose prime factors only include 2, 3, 5.
// For example, 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence of the first 10 ugly numbers.

// Note that 1 is typically treated as an ugly number.

// Hint:
// The naive approach is to call isUgly for every number until you reach the nth one. Most numbers are not ugly.
// Try to focus your effort on generating only the ugly ones.
// An ugly number must be multiplied by either 2, 3, or 5 from a smaller ugly number.
// The key is how to maintain the order of the ugly numbers.
// Try a similar approach of merging from three sorted lists: L1, L2, and L3.
// Assume you have Uk, the kth ugly number. Then Uk+1 must be Min(L1 * 2, L2 * 3, L3 * 5).

// Time:  O(n)
// Space: O(1)
// Heap solution. (148ms)

#import <Foundation/Foundation.h>

#pragma mark Queue

@interface PriorityQueue : NSObject

@property (readonly, strong) id front;
@property (readonly, strong) id back;

- (instancetype)init;
- (id)pop;
- (void)push:(id)element;
-(NSInteger)count;

@end

@implementation PriorityQueue

NSMutableArray* _array;
BOOL _isMinHeap;

- (instancetype)initIsMinHeap:(BOOL)isMinHeap {
  self = [super init];
  if (self) {
    _array = [[NSMutableArray alloc] init];
    _isMinHeap = isMinHeap;
  }
  return self;
}

-(instancetype)init {
  return [self initIsMinHeap:YES];
}

- (BOOL)isEmpty {
  return [_array count] == 0;
}

- (void)push:(id)element {
  [_array addObject:element];
  [_array sortUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
    if (_isMinHeap) {
      return [obj1 compare:obj2];
    } else {
      return [obj2 compare:obj1];
    }
  }];
}

- (id)pop {
  if (self.isEmpty) {
    return nil;
  }
  id element = [_array objectAtIndex:0];
  if (element) {
    [_array removeObjectAtIndex:0];
  }
  if (![self isEmpty]) {
    [_array sortUsingComparator:^NSComparisonResult(id  _Nonnull obj1, id  _Nonnull obj2) {
      if (_isMinHeap) {
        return [obj1 compare:obj2];
      } else {
        return [obj2 compare:obj1];
      }
    }];
  }
  return element;
}

- (id)front {
  if (self.isEmpty) {
    return nil;
  }
  return [_array objectAtIndex:0];
}

- (id)back {
  if (self.isEmpty) {
    return nil;
  }
  return [_array lastObject];
}

-(NSInteger)count {
  return _array.count;
}

@end

NSInteger nthUglyNumber(int n) {
  NSInteger uglyNumber = 0;
  PriorityQueue* heap = [[PriorityQueue alloc] initIsMinHeap:YES];
  
  [heap push:@1];
  for (int i = 0; i < n; ++i) {
    uglyNumber = [[heap pop] intValue];
    if (uglyNumber % 2 == 0) {
      [heap push:@(uglyNumber * 2)];
    } else if (uglyNumber % 3 == 0) {
      [heap push:@(uglyNumber * 2)];
      [heap push:@(uglyNumber * 3)];
    } else {
      [heap push:@(uglyNumber * 2)];
      [heap push:@(uglyNumber * 3)];
      [heap push:@(uglyNumber * 5)];
    }
  }
  return uglyNumber;
}