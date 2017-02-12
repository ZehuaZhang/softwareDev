// 173. Binary Search Tree Iterator
// Difficulty: Medium

// Implement an iterator over a binary search tree (BST). Your iterator will be initialized with the root node of a BST.

// Calling next() will return the next smallest number in the BST.

// Note: next() and hasNext() should run in average O(1) time and uses O(h) memory, where h is the height of the tree.

// Your BSTIterator will be called like this:
// BSTIterator i = BSTIterator(root);
// while (i.hasNext()) cout << i.next();

// Time:  O(1), amortized
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

#pragma mark BSTIterator

@interface BSTIterator : NSObject

-(id)initWithNode:(TreeNode*)root;
-(BOOL)hasNext;
-(int)next;

@end

@implementation BSTIterator
NSMutableArray* _stack;
TreeNode *_curr;

-(id)initWithNode:(TreeNode*)root {
  self = [super init];
  if (self) {
    _curr = root;
    _stack = @[].mutableCopy;
  }
  return self;
}

/** @return whether we have a next smallest number */
-(BOOL)hasNext {
  return [_stack count] || _curr;
}

/** @return the next smallest number */
-(int)next {
  while (_curr) {
    [_stack addObject:_curr];
    _curr = _curr.left;
  }
  TreeNode* node = [_stack lastObject];
  [_stack removeLastObject];
  _curr = node.right;
  
  return (int)node.value;
}

@end