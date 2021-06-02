// 156. Binary Tree Upside Down
// Diffiuclty : Medium

// Given a binary tree where all the right nodes are either leaf nodes with a sibling
// (a left node that shares the same parent node) or empty, flip it upside down and turn it
// into a tree where the original right nodes turned into left leaf nodes. Return the new root.

// For example:

// Given a binary tree {1,2,3,4,5},

//     1

//    / \

//   2   3

//  / \

// 4   5

// return the root of the binary tree [4,5,2,#,#,3,1].

//    4

//   / \

//  5   2

//     / \

//    3   1

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

@implementation TreeNode

-(id)initWithValue:(NSInteger)value leftNode:(TreeNode*)left rightNode:(TreeNode*)right {
  self = [super init];
  if (self) {
    self.value = value;
    self.left = left;
    self.right = right;
  }
  return self;
}

-(id)initWithValue:(NSInteger)value leftNode:(TreeNode *)left {
  return [self initWithValue:value leftNode:left rightNode:nil];
}

-(id)initWithValue:(NSInteger)value rightNode:(TreeNode *)right {
  return [self initWithValue:value leftNode:nil rightNode:right];
}

-(id)initWithValue:(NSInteger)value {
  return [self initWithValue:value leftNode:nil rightNode:nil];
}

-(id)init {
  return [self initWithValue:0 leftNode:nil rightNode:nil];
}

@end

#pragma mark Solution

// Iterative
TreeNode *upsideDownBinaryTree(TreeNode *root) {
  TreeNode *curr = root, *parent = NULL, *next = NULL, *cousin = NULL;
  while (curr) {
    next = curr.left;
    curr.left = cousin;  // its cousin
    cousin = curr.right;
    curr.right = parent;  // its parent
    
    parent = curr;
    curr = next;
  }
  return parent;
}