// 143. Reorder List
// Difficulty: Medium

// Given a singly linked list L: L0→L1→…→Ln-1→Ln,
// reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

// You must do this in-place without altering the nodes values.

// For example,
// Given {1,2,3,4}, reorder it to {1,4,2,3}.

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

ListNode *reverse(ListNode* head) {
  ListNode *prev = nil;
  
  while (head) {
    ListNode* next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  
  return prev;
}

ListNode *merge(ListNode* list1, ListNode* list2) {
  ListNode* dummy = [[ListNode alloc] init];
  ListNode* curr = dummy;
  
  while (list1 && list2) {
    ListNode* next = list1.next;
    
    curr.next = list1;
    curr = curr.next;
    curr.next = list2;
    curr = curr.next;
    
    list1 = next;
    list2 = list2.next;
  }
  
  if (list1) {
    curr.next = list1;
  }
  
  return dummy.next;
}

void reorderList(ListNode *head) {
  if (!head) {
    return;
  }
  
  ListNode* slow = head, *fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  // Split into two lists.
  ListNode* head2 = slow.next;
  slow.next = nil;
  
  merge(head, reverse(head2));
}