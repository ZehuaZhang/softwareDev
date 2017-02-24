// 257. Binary Tree Paths
// Difficulty: Easy

// Given a binary tree, return all root-to-leaf paths.

// For example, given the following binary tree:

//    1
//  /   \
// 2     3
//  \
//   5
// All root-to-leaf paths are:

// ["1->2->5", "1->3"]

// Time:  O(n * h)
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

void binaryTreePathsHelper(TreeNode* node, NSArray* path, NSMutableArray** result) {
  if (!node) {
    return;
  }
  if (!node.left && !node.right) {
    [*result addObject:[[path arrayByAddingObject:node] componentsJoinedByString:@"->"]];
    return;
  }
  if (node.left) {
    binaryTreePathsHelper(node.left, [path arrayByAddingObject:node], result);
  }
  if (node.right) {
    binaryTreePathsHelper(node.right, [path arrayByAddingObject:node], result);
  }
}

NSArray* binaryTreePaths(TreeNode* root) {
  NSMutableArray* result = @[].mutableCopy;
  binaryTreePathsHelper(root, @[], &result);
  return result;
}


