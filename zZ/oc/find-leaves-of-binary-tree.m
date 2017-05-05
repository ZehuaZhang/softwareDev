// 366. Find Leaves of Binary Tree
// Difficulty : Medium

// Given a binary tree, find all leaves and then remove those leaves.
// Then repeat the previous steps until the tree is empty.

// Example:
// Given binary tree
//           1
//          / \
//         2   3
//        / \
//       4   5
// Returns [4, 5, 3], [2], [1].

// Explanation:
// 1. Remove the leaves [4, 5, 3] from the tree

//           1
//          /
//         2
// 2. Remove the leaf [2] from the tree

//           1
// 3. Remove the leaf [1] from the tree

//           []
// Returns [4, 5, 3], [2], [1].

// Time:  O(n)
// Space: O(h)

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

#pragma mark Solution

int findLeavesHelper(TreeNode *node, NSMutableArray** result) {
  if (!node) {
    return -1;
  }
  const int level = 1 + MAX(findLeavesHelper(node.left, result), findLeavesHelper(node.right, result));
  if ((*result).count < level + 1){
    [(*result) addObject:@[].mutableCopy];
  }
  [result[level] addObject:@(node.value)];
  return level;
}

NSArray* findLeaves(TreeNode* root) {
  NSMutableArray* result = @[].mutableCopy;
  findLeavesHelper(root, &result);
  return result;
}