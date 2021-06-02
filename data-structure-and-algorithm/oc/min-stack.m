// 155. Min Stack
// Difficulty: Easy

// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

// push(x) -- Push element x onto stack.
// pop() -- Removes the element on top of the stack.
// top() -- Get the top element.
// getMin() -- Retrieve the minimum element in the stack.

// Example:
// MinStack minStack = new MinStack();
// minStack.push(-2);
// minStack.push(0);
// minStack.push(-3);
// minStack.getMin();   --> Returns -3.
// minStack.pop();
// minStack.top();      --> Returns 0.
// minStack.getMin();   --> Returns -2.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

#pragma mark MinStack

@interface MinStack : NSObject

- (void) push:(int)x;
- (void) pop;
- (int) top;
- (int) getMin;

- (instancetype) init;

@end

@implementation MinStack

NSMutableArray* _diff;
int _stackMin;

- (instancetype) init {
  self = [super init];
  if (self) {
    _stackMin = INT_MIN;
    _diff = @[].mutableCopy;
  }
  return self;
}

- (void) push:(int)x {
  if (![_diff count]) {
    [_diff addObject:@0];
    _stackMin = x;
  } else {
    [_diff addObject:@(x - _stackMin)]; // compare with previous min
    _stackMin = MIN(_stackMin, x); // Update min.
  }
}

- (void) pop {
  if ([[_diff lastObject] intValue] < 0) {
    _stackMin -= [[_diff lastObject] intValue]; // Restore previous min.
  }
  [_diff removeLastObject];
}

- (int) top {
  if ([[_diff lastObject] intValue] > 0) {
    return _stackMin + [[_diff lastObject] intValue];
  } else {
    return _stackMin;
  }
}

- (int) getMin {
  return _stackMin;
}

@end