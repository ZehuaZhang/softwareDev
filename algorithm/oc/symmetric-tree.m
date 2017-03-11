// 101. Symmetric Tree
// Difficulty: Easy

// Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

// For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

//     1
//    / \
//   2   2
//  / \ / \
// 3  4 4  3
// But the following [1,2,2,null,3,null,3] is not:
//     1
//    / \
//   2   2
//    \   \
//    3    3
// Note:
// Bonus points if you could solve it both recursively and iteratively.

// Time:  O(n)
// Space: O(h), h is the height of the binary tree.

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

// Iterative solution. Preorder Traversal

bool isSymmetric(TreeNode* root) {
  if (!root) {
    return YES;
  }
  // isSymmetricHelper(root->left, root->right)
  NSMutableArray* nodes = @[].mutableCopy;
  [nodes addObject:root.left];
  [nodes addObject:root.right];
  
  while (![nodes count])  {
    TreeNode* right = [nodes lastObject];
    [nodes removeLastObject];
    TreeNode* left = [nodes lastObject];
    [nodes removeLastObject];
    if (!left && !right) {
      continue;
    }
    if (!left || !right || left.value != right.value) {
      return NO;
    }
    
    [nodes addObject:left.right];
    [nodes addObject:right.left];
    
    [nodes addObject:left.left];
    [nodes addObject:right.right];
  }
  return YES;
}
