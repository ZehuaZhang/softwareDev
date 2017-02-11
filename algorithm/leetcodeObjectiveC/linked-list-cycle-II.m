// 142. Linked List Cycle II
// Difficulty: Medium

// Given a linked list, return the node where the cycle begins. If there is no cycle, return null.

// Note: Do not modify the linked list.

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

ListNode *detectCycle(ListNode *head) {
  ListNode *slow = head, *fast = head;
  
  while (fast && fast.next) {
    slow = slow.next, fast = fast.next.next;
    if (slow == fast) {  // There is a cycle.
      slow = head;
      // Both pointers advance at the same time.
      while (slow != fast) {
        slow = slow.next, fast = fast.next;
      }
      return slow;  // slow is the begin of cycle.
    }
  }
  return nil;
}
