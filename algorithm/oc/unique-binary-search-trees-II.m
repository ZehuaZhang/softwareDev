// 95. Unique Binary Search Trees II
// Difficulty: Medium

// Given an integer n, generate all structurally unique BST (binary search trees) that store values 1...n.

// For example,
// Given n = 3, your program should return all 5 unique BST shown below.

//    1         3     3      2      1
//     \       /     /      / \      \
//      3     2     1      1   3      2
//     /     /       \                 \
//    2     1         2                 3

// Time:  O(n!)
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

NSArray* generateHelper(int start, int end) {
  if (start > end) {
    return @[[NSNull null]];
  }
  NSMutableArray* subTree;
  for (int k = start; k <= end; k++) {
    for (id left in generateHelper(start, k - 1)) {
      for (id right in generateHelper(k + 1, end)) {
        TreeNode *node = [[TreeNode alloc] initWithValue:k];
        node.left = left == [NSNull null] ? nil : left;
        node.right = right == [NSNull null] ? nil : right;
        [subTree addObject:node];
      }
    }
  }
  return subTree;
}

NSArray* generateTrees(int n) {
  if (n == 0) {
    return generateHelper(1, 0);
  }
  return generateHelper(1, n);
}

