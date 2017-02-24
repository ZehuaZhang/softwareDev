// 298. Binary Tree Longest Consecutive Sequence
// Difficulty : Medium

// Given a binary tree, find the length of the longest increasing consecutive sequence path.

// The path refers to any sequence of nodes from some starting node to any node in the tree along the parent-child connections.
// The longest consecutive path need to be from parent to child (cannot be the reverse).

// For example,

//    1
//     \
//      3
//     / \
//    2   4
//         \
//          5
// Longest consecutive sequence path is 3-4-5, so return 3.

//    2
//     \
//      3
//     /
//    2
//   /
//  1
// Longest consecutive sequence path is 2-3,not3-2-1, so return 2.

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

int longestConsecutiveHelper(TreeNode *root, int* maxLen) {
  if (!root) {
    return 0;
  }
  const int leftLen = longestConsecutiveHelper(root.left, maxLen);
  const int rightLen = longestConsecutiveHelper(root.right, maxLen);
  
  int currLen = 1;
  if (root.left && root.left.value == root.value + 1) {
    currLen = MAX(currLen, leftLen + 1);
  }
  if (root.right && root.right.value == root.value + 1) {
    currLen = MAX(currLen, rightLen + 1);
  }
  *maxLen = MAX(*maxLen, currLen);
  return currLen;
}

int longestConsecutive(TreeNode* root) {
  int maxLen = 0;
  longestConsecutiveHelper(root, &maxLen);
  return maxLen;
}