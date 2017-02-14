// 250. Count Univalue Subtrees
// Difficulty : Medium

// Given a binary tree, count the number of uni-value subtrees.

// A Uni-value subtree means all nodes of the subtree have the same value.

// For example:
// Given binary tree,

//               5
//              / \
//             1   5
//            / \   \
//           5   5   5


// return 4.

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

BOOL isSame(TreeNode* root, TreeNode* child, BOOL isUni) {
  return child == nil || (isUni && root.value == child.value);
}

BOOL isUnivalSubtrees(TreeNode* root, int* count) {
  if (!root) {
    return YES;
  }
  BOOL left = isUnivalSubtrees(root.left, count);
  BOOL right = isUnivalSubtrees(root.right, count);
  if (isSame(root, root.left, left) &&
      isSame(root, root.right, right)) {
    ++(*count);
    return YES;
  }
  return NO;
}

int countUnivalSubtrees(TreeNode* root) {
  int count = 0;
  isUnivalSubtrees(root, &count);
  return count;
}


