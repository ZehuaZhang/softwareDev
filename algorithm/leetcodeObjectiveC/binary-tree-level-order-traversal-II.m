// 107. Binary Tree Level Order Traversal II
// Difficulty: Easy

// Given a binary tree, return the bottom-up level order traversal of its nodes values. (ie, from left to right, level by level from leaf to root).

// For example:
// Given binary tree [3,9,20,null,null,15,7],
//     3
//    / \
//   9  20
//     /  \
//    15   7
// return its bottom-up level order traversal as:
// [
//   [15,7],
//   [9,20],
//   [3]
// ]

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

void levelOrderBottomHelper(TreeNode *root, NSInteger level, NSMutableArray** result) {
  if (!root) {
    return;
  }
  
  if (level > [*result count]) {
    [*result addObject: @[].mutableCopy];
  }
  [(*result)[level - 1] addObject:@(root.value)];
  
  levelOrderBottomHelper(root.left, level + 1, result);
  levelOrderBottomHelper(root.right, level + 1, result);
}

NSArray* levelOrderBottom(TreeNode *root) {
  NSMutableArray* result = @[].mutableCopy;
  levelOrderBottomHelper(root, 1, &result);
  return [[result reverseObjectEnumerator] allObjects];
}

