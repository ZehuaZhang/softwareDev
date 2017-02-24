// 255. Verify Preorder Sequence in Binary Search Tree
// Difficulty : Medium

// Given an array of numbers, verify whether it is the correct preorder traversal sequence of a binary search tree.

// You may assume each number in the sequence is unique.

// Follow up:
// Could you do it using only constant space complexity?

// Time:  O(n)
// Space: O(h)

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

BOOL verifyPreorder(NSArray* preorder) {
  int low = INT_MIN;
  Stack* path = [[Stack alloc] init];
  for (id node in preorder) {
    if ([node intValue] < low) {
      return NO;
    }
    while (![path isEmpty] && [node isGreaterThan:[path top]]) {
      // node is in right subtree
      // pop left subtree & root, use it as a lower bound because
      // we shouldn't come across a smaller number anymore.
      low = [[path pop] intValue];
    }
    [path push:node];
  }
  return YES;
}
