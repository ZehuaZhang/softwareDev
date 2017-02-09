// 61. Rotate List
// Difficulty: Medium

// Given a list, rotate the list to the right by k places, where k is non-negative.

// For example:
// Given 1->2->3->4->5->NULL and k = 2,
// return 4->5->1->2->3->NULL.

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

ListNode* rotateRight(ListNode* head, int k) {
  if (!head) {
    return head;
  }
  
  int len = 1;
  ListNode* curr = head;
  while(curr.next) {
    ++len;
    curr = curr.next;
  }
  curr.next = head;
  
  k = len - k % len;
  for (int i = 0; i < k; ++i) {
    curr = curr.next;
  }
  
  head = curr.next;
  curr.next = nil;
  
  return head;
}

