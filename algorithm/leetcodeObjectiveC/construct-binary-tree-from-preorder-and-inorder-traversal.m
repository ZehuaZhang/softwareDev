// 105. Construct Binary Tree from Preorder and Inorder Traversal
// Difficulty: Medium

// Given preorder and inorder traversal of a tree, construct the binary tree.

// Note:
// You may assume that duplicates do not exist in the tree.

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

TreeNode* buildTreeHelper(NSArray* preorder, NSInteger preFirst, NSInteger preLast, NSArray* inorder, NSInteger inFirst, NSInteger inLast) {
  if (preFirst == preLast || inFirst == inLast) {
    return nil;
  }
  TreeNode* root = [[TreeNode alloc] initWithValue:[preorder[preFirst] integerValue]];
  NSInteger inorderRootPos = [inorder indexOfObject:preorder[preFirst]];
  NSInteger leftSize = inorderRootPos - inFirst;
  root.left = buildTreeHelper(preorder, preFirst + 1, preFirst + leftSize + 1, inorder, inFirst, inorderRootPos);
  root.right = buildTreeHelper(preorder, preFirst + leftSize + 1, preLast, inorder, inorderRootPos + 1, inLast);
  return root;
}

TreeNode* buildTree(NSArray* preorder, NSArray* inorder) {
  return buildTreeHelper(preorder, 0, [preorder count], inorder, 0, [inorder count]);
}
