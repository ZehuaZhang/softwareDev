// 141. Linked List Cycle
// Difficulty: Easy

// Given a linked list, determine if it has a cycle in it.

// Follow up:
// Can you solve it without using extra space?

// Time:  O(n)
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

BOOL hasCycle(ListNode *head) {
  ListNode *slow = head, *fast = head;
  
  while (fast && fast.next) {
    slow = slow.next, fast = fast.next.next;
    if (slow == fast) {  // There is a cycle.
      return YES;
    }
  }
  return NO;  // No cycle.
}
