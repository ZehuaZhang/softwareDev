// 314. Binary Tree Vertical Order Traversal
// Difficulty : Medium

// Given a binary tree, return the vertical order traversal of its nodes values. (ie, from top to bottom, column by column).

// If two nodes are in the same row and column, the order should be from left to right.

// Examples:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its vertical order traversal as:
// [
//   [9],
//   [3,15],
//   [20],
//   [7]
// ]
// Given binary tree [3,9,20,4,5,2,7],
//     _3_
//    /   \
//   9    20
//  / \   / \
// 4   5 2   7
// return its vertical order traversal as:
// [
//   [4],
//   [9],
//   [3,5,2],
//   [20],
//   [7]
// ]

// Time:  O(n)
// Space: O(n)

#import <Foundation/Foundation.h>

#pragma mark TreeNode

@interface TreeNode : NSObject

@property (atomic, assign) NSInteger value;
@property (atomic, strong) TreeNode* left;
@property (atomic, strong) TreeNode* right;

-(id)initWithValue:(NSInteger)value leftNode:(TreeNode*)left rightNode:(TreeNode*)right;
-(id)initWithValue:(NSInteger)value leftNode:(TreeNode *)left;
-(id)initWithValue:(NSInteger)value rightNode:(TreeNode *)right;
-(id)initWithValue:(NSInteger)value;
-(id)init;

@end

#pragma mark Queue

@interface Queue : NSObject

@property (readonly, strong) id front;
@property (readonly, strong) id back;

- (instancetype)init;
- (id)pop;
- (void)push:(id)element;
- (id)front;
-(BOOL)isEmpty;
-(NSInteger)count;

@end

#pragma mark Solution

NSArray* verticalOrder(TreeNode* root) {
  NSMutableDictionary* cols = @{}.mutableCopy;
  Queue* queue = [[Queue alloc] init];
  [queue push:@[root, @0]];
  int minIdx = 0, maxIdx = 0;
  
  while (![queue isEmpty]) {
    TreeNode *curr = [queue front][0];
    int idx = [[queue front][1] intValue];
    [queue pop];
    
    if (cols[@(idx)]) {
      cols[@(idx)] = @[].mutableCopy;
    }
    [cols[@(idx)] addObject:@(curr.value)];
    
    if (curr.left) {
      [queue push:@[curr.left, @(idx - 1)]];
      minIdx = MIN(minIdx, idx - 1);
    }
    if (curr.right) {
      [queue push:@[curr.right, @(idx + 1)]];
      maxIdx = MAX(maxIdx, idx + 1);
    }
  }
  NSMutableArray* result = @[].mutableCopy;
  for (int i = minIdx; i <= maxIdx; ++i) {
    [result addObject:cols[@(i)]];
  }
  return result;
}