// 138. Copy List with Random Pointer
// Difficulty: Hard

// A linked list is given such that each node contains an additional random pointer which could point to any node in the list or null.

// Return a deep copy of the list.

// Time:  O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

#pragma mark ListNode

@interface RandomListNode : NSObject

@property (atomic, assign) NSInteger value;
@property (atomic, strong) RandomListNode *next;
@property (atomic, strong) RandomListNode *random;

- (id)initWithValue:(NSInteger)value next:(RandomListNode *)next;
- (id)initWithValue:(NSInteger)value;
- (id)init;

@end

@implementation RandomListNode

- (id)initWithValue:(NSInteger)value next:(RandomListNode *)next {
  self = [super init];
  if (self) {
    self.value = value;
    self.next = next;
    self.random = nil;
  }
  return self;
}

- (id)initWithValue:(NSInteger)value {
  return [self initWithValue:value next:nil];
}

- (id)init {
  return [self initWithValue:0 next:nil];
}

@end

#pragma mark Solution

RandomListNode *copyRandomList(RandomListNode *head) {
  // Insert the copied node after the original one.
  for (RandomListNode* curr = head; curr; curr = curr.next.next) {
    RandomListNode* node =  [[RandomListNode alloc] initWithValue:curr.value];
    node.next = curr.next;
    curr.next = node;
  }
  
  // Update random node.
  for (RandomListNode* curr = head; curr; curr = curr.next.next) {
    if (curr.random) {
      curr.next.random = curr.random.next;
    }
  }
  
  // Seperate the copied nodes from original ones.
  RandomListNode* dummy = [[RandomListNode alloc] init];
  for (RandomListNode* curr = head, *copyCurr = dummy;
       curr;
       copyCurr = copyCurr.next, curr = curr.next) {
    copyCurr.next = curr.next;
    curr.next = curr.next.next;
  }
  
  return dummy.next;
}
