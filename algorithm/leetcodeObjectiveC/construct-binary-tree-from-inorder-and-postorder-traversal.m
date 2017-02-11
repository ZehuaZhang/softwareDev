// 106. Construct Binary Tree from Inorder and Postorder Traversal
// Difficulty: Medium

// Given inorder and postorder traversal of a tree, construct the binary tree.

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

TreeNode* buildTreeHelper(NSArray* inorder, NSInteger inFirst, NSInteger inLast, NSArray* postorder, NSInteger postFirst, NSInteger postLast) {
  if (inFirst == inLast || postFirst == postLast) {
    return nil;
  }
  TreeNode* root = [[TreeNode alloc] initWithValue:[postorder[postLast - 1] integerValue]];
  NSInteger inorderRootPos = [inorder indexOfObject:postorder[postLast - 1]];
  NSInteger leftSize = inorderRootPos - inFirst;
  root.left = buildTreeHelper(inorder, inFirst, inorderRootPos, postorder, postFirst, postFirst + leftSize);
  root.right = buildTreeHelper(inorder, inorderRootPos + 1, inLast, postorder, postFirst + leftSize, postLast - 1);
  return root;
}

TreeNode* buildTree(NSArray* preorder, NSArray* inorder) {
  return buildTreeHelper(preorder, 0, [preorder count], inorder, 0, [inorder count]);
}
