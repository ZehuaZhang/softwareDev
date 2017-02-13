// 236. Lowest Common Ancestor of a Binary Tree
// Difficulty: Medium

// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

// According to the definition of LCA on Wikipedia:
// “The lowest common ancestor is defined between two nodes v and w as the lowest node in T
// that has both v and w as descendants (where we allow a node to be a descendant of itself).”

//         _______3______
//        /              \
//     ___5__          ___1__
//    /      \        /      \
//    6      _2       0       8
//          /  \
//          7   4

// For example, the lowest common ancestor (LCA) of nodes 5 and 1 is 3.
//  Another example is LCA of nodes 5 and 4 is 5,
//  since a node can be a descendant of itself according to the LCA definition.

// Time:  O(n)
// Space: O(h)

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
  if (!root || root == p || root == q) {
    return root;
  }
  TreeNode *left = lowestCommonAncestor(root.left, p, q);
  TreeNode *right = lowestCommonAncestor(root.right, p, q);
  // 1. If the current subtree contains both p and q,
  //    return their LCA.
  // 2. If only one of them is in that subtree,
  //    return that one of them.
  // 3. If neither of them is in that subtree,
  //    return the node of that subtree.
  return left ? (right ? root : left) : right;
}