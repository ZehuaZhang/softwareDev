// 113. Path Sum II
// Difficulty: Medium
// Given a binary tree and a sum, find all root-to-leaf paths where each path sum equals the given sum.

// For example:
// Given the below binary tree and sum = 22,
//               5
//              / \
//             4   8
//            /   / \
//           11  13  4
//          /  \    / \
//         7    2  5   1
// return
// [
//    [5,4,11,2],
//    [5,8,4,5]
// ]

// Time : O(n)
// Space: O(logn)

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

void pathSumHelper(TreeNode *root, NSInteger sum, NSMutableArray** path, NSMutableArray** ans) {
  if(!root) {
    return;
  }
  
  [*path addObject:@(root.value)];
  
  if(!root.left && !root.right && root.value == sum) {
    [*ans addObject:*path];
  }
  
  pathSumHelper(root.left, sum - root.value, path, ans);
  pathSumHelper(root.right, sum - root.value, path, ans);
  
  [*path removeLastObject];
}

NSArray* pathSum(TreeNode *root, int sum) {
  NSMutableArray* ans = @[].mutableCopy;
  NSMutableArray* path = @[].mutableCopy;
  pathSumHelper(root, sum, &path, &ans);
  return ans;
}