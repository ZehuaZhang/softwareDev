// 222. Count Complete Tree Nodes
// Difficulty: Medium

// Given a complete binary tree, count the number of nodes.

// Definition of a complete binary tree from Wikipedia:
// In a complete binary tree every level, except possibly the last, is completely filled,
// and all nodes in the last level are as far left as possible. It can have between 1 and 2h nodes inclusive at the last level h.

// Time:  O(h * logn) = O((logn)^2)
// Space: O(1)

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

// Check if the nth node exist.

int countNodes(TreeNode* root) {
  int hLeft = 0, hRight = 0;
  TreeNode* pLeft = root;
  TreeNode* pRight = root;
  while (pLeft) {
    ++hLeft;
    pLeft = pLeft.left;
  }
  while (pRight) {
    ++hRight;
    pRight = pRight.right;
  }
  if (hLeft == hRight) { 
    return pow(2, hLeft) - 1;
  }
  return countNodes(root.left) + countNodes(root.right) + 1;
}


