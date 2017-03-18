// 226. Invert Binary Tree
// Difficulty: Easy

// Invert a binary tree.

//      4
//    /   \
//   2     7
//  / \   / \
// 1   3 6   9
// to
//      4
//    /   \
//   7     2
//  / \   / \
// 9   6 3   1

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

#pragma mark Stack

@interface Stack : NSObject

- (instancetype)init;
- (id)pop;
- (void)push:(id)element;
-(NSInteger)count;

@end

@implementation Stack

NSMutableArray* _array;

- (instancetype)init {
  self = [super init];
  if (self) {
    _array = [[NSMutableArray alloc] init];
  }
  return self;
}

- (BOOL)isEmpty {
  return [_array count] == 0;
}

- (void)push:(id)element {
  [_array addObject:element];
}

- (id)pop {
  if (self.isEmpty) {
    return nil;
  }
  id element = [_array lastObject];
  if (element) {
    [_array removeLastObject];
  }
  return element;
}

- (id)top {
  if (self.isEmpty) {
    return nil;
  }
  return [_array lastObject];
}

-(NSInteger)count {
  return [_array count];
}

@end

#pragma mark Solution

// DFS solution.

void swap(TreeNode** a, TreeNode** b){
  TreeNode* temp = *a;
  *a = *b;
  *b = temp;
}

TreeNode* invertTree(TreeNode* root) {
  if (root) {
    Stack* stack = [[Stack alloc] init];
    [stack push:root];
    
    while (![stack isEmpty]) {
      TreeNode* curr = [stack pop];
      
      TreeNode* left = curr.left;
      TreeNode* right = curr.right;
      swap(&left, &right);
      
      if (curr.left) {
        [stack push:curr.left];
      }
      if (curr.right) {
        [stack push:curr.right];
      }
    }
  }
  return root;
}

// DFS, Recursive solution.

TreeNode* invertTree2(TreeNode* root) {  // preorder
  if (root) {
    TreeNode* left = root.left;
    TreeNode* right = root.right;
    swap(&left, &right);
    
    invertTree2(root.left);
    invertTree2(root.right);
  }
  return root;
}