// 235. Lowest Common Ancestor of a Binary Search Tree
// Difficulty: Easy

// Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined
// between two nodes v and w as the lowest node in T that has both v and w as descendants
// (where we allow a node to be a descendant of itself).”

//         _______6______
//        /              \
//     ___2__          ___8__
//    /      \        /      \
//    0      _4       7       9
//          /  \
//          3   5

// For example, the lowest common ancestor (LCA) of nodes 2 and 8 is 6.
// Another example is LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.

// Time:  O(h)
// Space: O(1)

#import <Foundation/Foundation.h>

#pragma mark TreeNode

@interface TreeNode : NSObject

@property (atomic, assign) int value;
@property (atomic, strong) TreeNode* left;
@property (atomic, strong) TreeNode* right;

-(id)initWithValue:(int)value leftNode:(TreeNode*)left rightNode:(TreeNode*)right;
-(id)initWithValue:(int)value leftNode:(TreeNode *)left;
-(id)initWithValue:(int)value rightNode:(TreeNode *)right;
-(id)initWithValue:(int)value;
-(id)init;

@end

@implementation TreeNode

-(id)initWithValue:(int)value leftNode:(TreeNode*)left rightNode:(TreeNode*)right {
  self = [super init];
  if (self) {
    self.value = value;
    self.left = left;
    self.right = right;
  }
  return self;
}

-(id)initWithValue:(int)value leftNode:(TreeNode *)left {
  return [self initWithValue:value leftNode:left rightNode:nil];
}

-(id)initWithValue:(int)value rightNode:(TreeNode *)right {
  return [self initWithValue:value leftNode:nil rightNode:right];
}

-(id)initWithValue:(int)value {
  return [self initWithValue:value leftNode:nil rightNode:nil];
}

-(id)init {
  return [self initWithValue:0 leftNode:nil rightNode:nil];
}

@end

#pragma mark Solution

TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
  int minVal = MIN(p.value, q.value);
  int maxVal = MAX(p.value, q.value);
  
  while (root.value < minVal || root.value > maxVal) {
    root = root.value > maxVal ? root.left : root.right;
  }
  return root;
}