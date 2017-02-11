// 116. Populating Next Right Pointers in Each Node
// Difficulty: Medium

// Given a binary tree

//     struct TreeLinkNode {
//       TreeLinkNode *left;
//       TreeLinkNode *right;
//       TreeLinkNode *next;
//     }
// Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to NULL.

// Initially, all next pointers are set to NULL.

// Note:

// You may only use constant extra space.
// You may assume that it is a perfect binary tree (ie, all leaves are at the same level, and every parent has two children).
// For example,
// Given the following perfect binary tree,
//          1
//        /  \
//       2    3
//      / \  / \
//     4  5  6  7
// After calling your function, the tree should look like:
//          1 -> NULL
//        /  \
//       2 -> 3 -> NULL
//      / \  / \
//     4->5->6->7 -> NULL

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

#pragma mark TreeLinkNode

@interface TreeLinkNode : NSObject

@property (atomic, assign) NSInteger value;
@property (atomic, strong) TreeLinkNode* left;
@property (atomic, strong) TreeLinkNode* right;
@property (atomic, strong) TreeLinkNode* next;

-(id)initWithValue:(NSInteger)value leftNode:(TreeLinkNode*)left rightNode:(TreeLinkNode*)right;
-(id)initWithValue:(NSInteger)value leftNode:(TreeLinkNode*)left;
-(id)initWithValue:(NSInteger)value rightNode:(TreeLinkNode*)right;
-(id)initWithValue:(NSInteger)value;
-(id)init;

@end

@implementation TreeLinkNode

-(id)initWithValue:(NSInteger)value leftNode:(TreeLinkNode*)left rightNode:(TreeLinkNode*)right {
  self = [super init];
  if (self) {
    self.value = value;
    self.left = left;
    self.right = right;
    self.next = nil;
  }
  return self;
}

-(id)initWithValue:(NSInteger)value leftNode:(TreeLinkNode *)left {
  return [self initWithValue:value leftNode:left rightNode:nil];
}

-(id)initWithValue:(NSInteger)value rightNode:(TreeLinkNode *)right {
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

void connectNeighbours(TreeLinkNode* root) {
  while (root) {
    TreeLinkNode* next = nil; // the first parent node of next level
    for (TreeLinkNode* prev = nil; root; root = root.next) {
      // connect child nodes
      if (!next) {
        next = root.left ? root.left : root.right;
      }
      if (root.left) {
        if (prev) {
          prev.next = root.left;
        }
        prev = root.left;
      }
      if (root.right) {
        if (prev) {
          prev.next = root.right;
        }
        prev = root.right;
      }
    }
    root = next; // turn to next level
  }
}