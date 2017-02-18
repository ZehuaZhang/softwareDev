// 281. Zigzag Iterator
// Difficulty : Medium

// Given two 1d vectors, implement an iterator to return their elements alternately.

// For example, given two 1d vectors:
// v1 = [1, 2]
// v2 = [3, 4, 5, 6]
// By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1, 3, 2, 4, 5, 6].

// Follow up: What if you are given k 1d vectors? How well can your code be extended to such cases?

// Clarification for the follow up question - Update (2015-09-18):
// The "Zigzag" order is not clearly defined and is ambiguous for k > 2 cases.
// If "Zigzag" does not look right to you, replace "Zigzag" with "Cyclic". For example, given the following input:

// [1,2,3]
// [4,5,6,7]
// [8,9]
// It should return [1,4,8,2,5,9,3,6,7].

/**
 * Your ZigzagIterator object will be instantiated and called as such:
 * ZigzagIterator i(v1, v2);
 * while (i.hasNext()) cout << i.next();
 */

// Time:  O(n)
// Space: O(k)

#import <Foundation/Foundation.h>

#pragma mark Queue

@interface Queue : NSObject

@property (readonly, strong) id front;
@property (readonly, strong) id back;

- (instancetype)init;
- (id)pop;
- (void)push:(id)element;
- (id)front;
-(NSInteger)count;

@end

@implementation Queue

NSMutableArray* _array;

- (instancetype)init {
  self = [super init];
  if (self) {
    _array = [[NSMutableArray alloc] init];
  }
  return self;
}

- (BOOL)isEmpty {
  return [_array count] == 0;
}

- (void)push:(id)element {
  [_array addObject:element];
}

- (id)pop {
  if (self.isEmpty) {
    return nil;
  }
  id element = [_array objectAtIndex:0];
  if (element) {
    [_array removeObjectAtIndex:0];
  }
  return element;
}

- (id)front {
  if (self.isEmpty) {
    return nil;
  }
  return [_array objectAtIndex:0];
}

-(NSInteger)count {
  return _array.count;
}

@end

#pragma mark ZigzagIterator

@interface ZigzagIterator : NSObject
@end

@implementation ZigzagIterator

Queue* _queue;
NSArray* _array;

-(instancetype)initWithArray:(NSArray*)a1 Array2:(NSArray*)a2 {
  self = [super init];
  if (self) {
    _array = [NSArray arrayWithObjects:a1, a2, nil];
    _queue = [[Queue alloc] init];
    [_queue push:@[@0, @0]];
    [_queue push:@[@1, @0]];
  }
  return self;
}

-(instancetype)init {
  return [self initWithArray:@[] Array2:@[]];
}

-(int)next {
  NSArray* top = [_queue pop];
  NSInteger i = [top[0] integerValue];
  NSInteger j = [top[1] integerValue];
  int value = [_array[i][j++] intValue];
  if (j < [_array[i] count]) {
    [_queue push:@[@(i), @(j)]];
  }
  return value;
}

-(BOOL)hasNext {
  return ![_queue isEmpty];
}

@end
