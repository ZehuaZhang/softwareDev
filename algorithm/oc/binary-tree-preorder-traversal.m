// 144. Binary Tree Preorder Traversal
// Difficulty: Medium
// Given a binary tree, return the preorder traversal of its nodes values.

// For example:
// Given binary tree {1,#,2,3},
//    1
//     \
//      2
//     /
//    3
// return [1,2,3].

// Note: Recursive solution is trivial, could you do it iteratively?

// Time:  O(n)
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

NSArray* preorderTraversal(TreeNode* root) {
  NSMutableArray* stack = [[NSMutableArray alloc] init];
  if (root) {
    [stack addObject:root];
  }
  NSMutableArray* result = @[].mutableCopy;
  while ([stack count]) {
    const TreeNode* curr = [stack lastObject];
    [stack removeLastObject];
    [result addObject:@(curr.value)];
    
    if (curr.right) {
      [stack addObject:curr.right];
    }
    if (curr.left) {
      [stack addObject:curr.left];
    }
  }
  return result;
}