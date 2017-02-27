// 237. Delete Node in a Linked List
// Difficulty: Easy

// Write a function to delete a node (except the tail) in a singly linked list, given only access to that node.

// Supposed the linked list is 1 -> 2 -> 3 -> 4 and you are given the third node with value 3,
// the linked list should become 1 -> 2 -> 4 after calling your function.

// Time:  O(1)
// Space: O(1)

#import <Foundation/Foundation.h>

#pragma mark ListNode

@interface ListNode : NSObject

@property (atomic, assign) NSInteger value;
@property (atomic, strong) ListNode *next;

- (id)initWithValue:(NSInteger)value next:(ListNode *)next;
- (id)initWithValue:(NSInteger)value;
- (id)init;

@end

@implementation ListNode

- (id)initWithValue:(NSInteger)value next:(ListNode *)next {
  self = [super init];
  if (self) {
    self.value = value;
    self.next = next;
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

void deleteNode(ListNode* node) {
  if (!node) {
    return;
  }
  if (!node.next) {
    free((__bridge void*)node);
  }
  ListNode* next = node.next;
  node.value = next.value;
  node.next = next.next;
  free((__bridge void*)next);
}
