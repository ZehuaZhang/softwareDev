// 337. House Robber III
// Difficulty: Medium

// The thief has found himself a new place for his thievery again. There is only one entrance to this area,
// called the "root." Besides the root, each house has one and only one parent house.
// After a tour, the smart thief realized that "all houses in this place forms a binary tree".
// It will automatically contact the police if two directly-linked houses were broken into on the same night.

// Determine the maximum amount of money the thief can rob tonight without alerting the police.

// Example 1:
//      3
//     / \
//    2   3
//     \   \
//      3   1
// Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.
// Example 2:
//      3
//     / \
//    4   5
//   / \   \
//  1   3   1
// Maximum amount of money the thief can rob = 4 + 5 = 9.

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

#pragma mark Solution

NSArray* robHelper(TreeNode* root) {  // max profit <=> {include self node, exclude self node}
  if (!root) {
    return @[@0, @0];
  }
  NSArray* left = robHelper(root.left);
  NSArray* right = robHelper(root.right);
  return @[@(root.value + [left[1] intValue] + [right[1] intValue]),
           @(MAX([left[0] intValue], [left[1] intValue]) + MAX([right[0] intValue], [right[1] intValue]))];
}

int rob(TreeNode* root) {
  NSArray* result = robHelper(root);
  return MAX([result[0] intValue], [result[1] intValue]);
}