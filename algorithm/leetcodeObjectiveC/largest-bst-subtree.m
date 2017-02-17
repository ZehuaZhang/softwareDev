// 333. Largest BST Subtree
// Difficulty : Medium

// Given a binary tree, find the largest subtree which is a Binary Search Tree (BST),
// where largest means subtree with largest number of nodes in it.

// Note:
// A subtree must include all of its descendants.
// Heres an example:

//     10
//     / \
//    5  15
//   / \   \
//  1   8   7
// The Largest BST Subtree in this case is the highlighted one.
// The return value is the subtree size, which is 3.

// Hint:
// You can recursively use algorithm similar to 98. Validate Binary Search Tree at each node of the tree,
// which will result in O(nlogn) time complexity.

// Follow up:
// Can you figure out ways to solve it with O(n) time complexity?

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

NSArray* largestBSTSubtreeHelper(TreeNode* root, int* maxSize) {
  if (!root.left && !root.right) {
    return @[@1, @(root.value), @(root.value)];
  }
  
  NSArray* left = @[@0, @(root.value), @(root.value)];
  if (root.left) {
    left = largestBSTSubtreeHelper(root.left, maxSize);
  }
  NSArray* right = @[@0, @(root.value), @(root.value)];
  if (root.right) {
    right = largestBSTSubtreeHelper(root.right, maxSize);
  }
  
  int size = 0;
  if ((!root.left || [left[0] intValue] > 0) &&
      (!root.right || [right[0] intValue] > 0) &&
      [left[2] intValue] <= root.value && root.value <= [right[1] intValue]) {
    size = 1 + [left[0] intValue] + [right[0] intValue];
    *maxSize = MAX(*maxSize, size);
  }
  
  return @[@(size), left[1], right[2]];
}

int largestBSTSubtree(TreeNode* root) {
  if (!root) {
    return 0;
  }
  
  int maxSize = 1;
  largestBSTSubtreeHelper(root, &maxSize);
  return maxSize;
}
