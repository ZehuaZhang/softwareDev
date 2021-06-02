// 232. Implement Queue using Stacks
// Difficulty: Easy

// Implement the following operations of a queue using stacks.

// push(x) -- Push element x to the back of queue.
// pop() -- Removes the element from in front of queue.
// peek() -- Get the front element.
// empty() -- Return whether the queue is empty.
// Notes:
// You must use only standard operations of a stack -- which means only push to top, peek/pop from top, size, and is empty operations are valid.
// Depending on your language, stack may not be supported natively. You may simulate a stack by using a list or deque (double-ended queue),
// as long as you use only standard operations of a stack.
// You may assume that all operations are valid (for example, no pop or peek operations will be called on an empty queue).

// Time:  O(1), amortized
// Space: O(n)

#import <Foundation/Foundation.h>

#pragma mark Stack

@interface Stack : NSObject

- (instancetype)init;
- (id)pop;
- (void)push:(id)element;
-(NSInteger)count;

@end

@implementation Stack

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
  id element = [_array lastObject];
  if (element) {
    [_array removeLastObject];
  }
  return element;
}

- (id)top {
  if (self.isEmpty) {
    return nil;
  }
  return [_array lastObject];
}

-(NSInteger)count {
  return [_array count];
}

@end

#pragma mark Solution

@interface Queue : NSObject
@end

@implementation Queue

Stack* _in;
Stack* _out;

-(instancetype)init {
  self = [super init];
  if (self) {
    _in = [[Stack alloc] init];
    _out = [[Stack alloc] init];
  }
  return self;
}

-(void)push:(id)x {
  [_in push:x];
}
  
-(void)pop {
  [self peek];
  [_out pop];
}
  

-(int)peek {
  if ([_out isEmpty]) {
    while (![_in isEmpty]) {
      [_out push:[_in pop]];
    }
  }
  return [[_out top] intValue];
}

-(BOOL)empty {
  return [_in isEmpty] && [_out isEmpty];
}

@end