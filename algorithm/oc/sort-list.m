// 148. Sort List
// Difficulty: Medium

// Sort a linked list in O(n log n) time using constant space complexity.

// Time:  O(nlogn)
// Space: O(logn)

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

ListNode *mergeTwoLists(ListNode *l1, ListNode *l2) {
  ListNode* dummy = [[ListNode alloc] init];
  ListNode* curr = dummy;
  
  while (l1 && l2) {
    if (l1.value <= l2.value) {
      curr.next = l1;
      l1 = l1.next;
    } else {
      curr.next = l2;
      l2 = l2.next;
    }
    curr = curr.next;
  }
  curr.next = l1 ? l1 : l2;
  
  return dummy.next;
}

ListNode* sortList(ListNode* head) {
  if (!head || !head.next) {
    return head;
  }
  
  ListNode* slow = head, *fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // Split linked list.
  ListNode* head2 = slow.next;
  slow.next = nil;
  
  return mergeTwoLists(sortList(head), sortList(head2));
}
