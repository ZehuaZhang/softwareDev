// 369. Plus One Linked List
// Difficulty : Medium

// Given a non-negative number represented as a singly linked list of digits, plus one to the number.

// The digits are stored such that the most significant digit is at the head of the list.

// Example:
// Input:
// 1->2->3

// Output:
// 1->2->4

// Time:  O(n)
// Space: O(1)

// Two pointers solution.

#import <Foundation/Foundation.h>

#pragma mark ListNode

@interface ListNode : NSObject

@property (atomic, assign) NSInteger value;
@property (atomic, strong) ListNode *next;

- (id)initWithValue:(NSInteger)value next:(ListNode *)next;
- (id)initWithValue:(NSInteger)value;
- (id)init;

@end

#pragma mark Solution

ListNode* plusOne(ListNode* head) {
  if (!head) {
    return nil;
  }
  ListNode* dummy = [[ListNode alloc] init];
  dummy.next = head;
  
  ListNode* left = dummy, *right = head;
  while (right.next) {
    if (right.value != 9) {
      left = right;
    }
    right = right.next;
  }
  
  if (right.value != 9) {
    ++right.value;
  } else {
    ++left.value;
    right = left.next;
    while (right) {
      right.value = 0;
      right = right.next;
    }
  }
  if (dummy.value == 0) {
    free((__bridge void*)dummy);
    return head;
  }
  return dummy;
}
