// 92. Reverse Linked List II
// Difficulty: Medium

// Reverse a linked list from position m to n. Do it in-place and in one-pass.

// For example:
// Given 1->2->3->4->5->NULL, m = 2 and n = 4,

// return 1->4->3->2->5->NULL.

// Note:
// Given m, n satisfy the following condition:
// 1 ≤ m ≤ n ≤ length of list.

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

ListNode* reverseBetween(ListNode* head, int m, int n) {
  ListNode* dummy = [[ListNode alloc] init];
  dummy.next = head;
  
  ListNode* prev = dummy;
  
  for (int i = 0; i < m - 1; ++i) {
    prev = prev.next;
  }
  
  ListNode* curr = prev.next;
  
  for (int i = m; i < n; ++i) {
    ListNode* next = curr.next;
    ListNode* prevHead = prev.next;
    prev.next = next;
    curr.next = next.next;
    next.next = prevHead;
  }
  
  return dummy.next;
}