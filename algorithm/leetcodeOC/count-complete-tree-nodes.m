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
BOOL exist(TreeNode *root, int n) {
  int k;
  for (k = 1; k <= n; k <<= 1);
  k >>= 2;
  
  TreeNode *node = root;
  while (k > 0) {
    if ((n & k) == 0) {
      node = node.left;
    } else {
      node = node.right;
    }
    k >>= 1;
  }
  return node != nil;
}

int countNodes(TreeNode* root) {
  if (!root) {
    return 0;
  }
  
  TreeNode *node = root;
  int level = 0;
  while (node.left) {
    node = node.left;
    ++level;
  }
  
  int left = pow(2, level), right = pow(2, level + 1);
  while (left < right) {
    int mid = left + (right - left) / 2;
    if (!exist(root, mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left - 1;
}


