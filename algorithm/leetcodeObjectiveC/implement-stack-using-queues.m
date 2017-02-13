// 225. Implement Stack using Queues
// Difficulty: Easy

// Implement the following operations of a stack using queues.

// push(x) -- Push element x onto stack.
// pop() -- Removes the element on top of the stack.
// top() -- Get the top element.
// empty() -- Return whether the stack is empty.

// Notes:
// You must use only standard operations of a queue -- which means only push to back, peek/pop from front, size,
// and is empty operations are valid.
// Depending on your language, queue may not be supported natively. You may simulate a queue by using a list or
// deque (double-ended queue), as long as you use only standard operations of a queue.
// You may assume that all operations are valid (for example, no pop or top operations will be called on an empty stack).

// Time:  push: O(n), pop: O(1), top: O(1)
// Space: O(n)

#import <Foundation/Foundation.h>

#pragma mark Queue

@interface Queue : NSObject

@property (readonly, strong) id front;
@property (readonly, strong) id back;

- (instancetype)init;
- (id)pop;
- (void)push:(id)element;
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

#pragma mark Solution1

@interface Stack1 : NSObject
@end

@implementation Stack1

Queue* _q;

-(instancetype)init {
  self = [super init];
  if (self) {
    _q = [[Queue alloc] init];
  }
  return self;
}

// O(n)
-(void)push:(id)x {
  [_q push:x];
  for (int i = 0; i < [_q count] - 1; ++i) {
    [_q push:[_q pop]];
  }
}

-(void)pop {
  [_q pop];
}

-(id)top {
  return [_q front];
}

-(BOOL)empty {
  return [_q isEmpty];
}

@end

#pragma mark Solution2

@interface Stack2 : NSObject
@end

@implementation Stack2

Queue* _q;
id _top;

-(instancetype)init {
  self = [super init];
  if (self) {
    _q = [[Queue alloc] init];
  }
  return self;
}

-(void)push:(id)x {
  [_q push:x];
  _top = x;
}

// O(n)
-(void)pop {
  for (int i = 0; i < [_q count] - 1; ++i) {
    _top = [_q front];
    [_q push:[_q pop]];
  }
  [_q pop];
}

-(id)top {
  return _top;
}

-(BOOL)empty {
  return [_q isEmpty];
}

@end

