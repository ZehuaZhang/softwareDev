// Closest Binary Search Tree Value
// Difficulty : Easy

// Given a non-empty binary search tree and a target value, find the value in the BST that is closest to the target.

// Note:

// Given target value is a floating point.
// You are guaranteed to have only one unique value in the BST that is closest to the target.

// Time:  O(h)
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

int closestValue(TreeNode* root, double target) {
  double gap = INT_MAX;
  int closest = INT_MAX;
  
  while (root) {
    if (fabs(root.value - target) < gap) {
      gap = fabs(root.value - target);
      closest = (int)root.value;
    }
    if (target == root.value) {
      break;
    } else if (target < root.value) {
      root = root.left;
    } else {
      root = root.right;
    }
  }
  return closest;
}