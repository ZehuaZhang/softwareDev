// 108. Convert Sorted Array to Binary Search Tree
// Difficulty: Medium

// Given an array where elements are sorted in ascending order, convert it to a height balanced BST.

// Time:  O(n)
// Space: O(h)

#import <Foundation/Foundation.h>

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

TreeNode* sortedArrayToBSTHelper(NSArray* nums, NSInteger first, NSInteger last) {
  if (first >= last) {
    return nil;
  }
  NSInteger mid = first + (last - first) / 2;
  TreeNode* root = [[TreeNode alloc] initWithValue:[nums[mid] integerValue]];
  root.left = sortedArrayToBSTHelper(nums, first, mid);
  root.right = sortedArrayToBSTHelper(nums, mid + 1, last);
  return root;
}

TreeNode* sortedArrayToBST (NSArray* nums) {
  return sortedArrayToBSTHelper(nums, 0, nums.count - 1);
}
