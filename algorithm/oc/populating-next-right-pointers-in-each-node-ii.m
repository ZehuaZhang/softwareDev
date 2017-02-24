// 117. Populating Next Right Pointers in Each Node II
// Difficulty: Hard

// Follow up for problem "Populating Next Right Pointers in Each Node".

// What if the given tree could be any binary tree? Would your previous solution still work?

// Note:

// You may only use constant extra space.
// For example,
// Given the following binary tree,
//          1
//        /  \
//       2    3
//      / \    \
//     4   5    7
// After calling your function, the tree should look like:
//          1 -> NULL
//        /  \
//       2 -> 3 -> NULL
//      / \    \
//     4-> 5 -> 7 -> NULL

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