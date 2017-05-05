// 103. Binary Tree Zigzag Level Order Traversal
// Difficulty: Medium

// Given a binary tree, return the zigzag level order traversal of its nodes values.
// (ie, from left to right, then right to left for the next level and alternate between).

// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its zigzag level order traversal as:
// [
//   [3],
//   [20,9],
//   [15,7]
// ]

// Time : O(n)
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

void zigzagLevelOrderHelper(TreeNode *root, int level, NSMutableArray** result) {
  if (!root) {
    return;
  }
  
  if (level > [*result count]) {
    [*result addObject:@[].mutableCopy];
  }
  [(*result)[level - 1] addObject:@(root.value)];
  
  zigzagLevelOrderHelper(root.left, level + 1, result);
  zigzagLevelOrderHelper(root.right, level + 1, result);
}

NSArray* zigzagLevelOrder(TreeNode *root) {
  NSMutableArray* result;
  zigzagLevelOrderHelper(root, 1, &result);
  
  BOOL isLeftToRight = YES;
  for (int i = 0; i < [result count]; i++) {
    if (!isLeftToRight) {
      result[i] = [[[result[i] reverseObjectEnumerator] allObjects] mutableCopy];
    }
    isLeftToRight = !isLeftToRight;
  }
  
  return result;
}


