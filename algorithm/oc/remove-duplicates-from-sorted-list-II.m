// 82. Remove Duplicates from Sorted List II
// Difficulty: Medium

// Given a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list.

// For example,
// Given 1->2->3->3->4->4->5, return 1->2->5.
// Given 1->1->1->2->3, return 2->3.

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

ListNode* deleteDuplicates(ListNode* head) {
  ListNode* dummy = [[ListNode alloc] init];
  ListNode* prev = dummy;
  while (head) {
    if (head.next && head.next.value == head.value) {
      NSInteger value = head.value;
      while (head && head.value == value) {
        ListNode *toDelete = head;
        head = head.next;
        free((__bridge void *)(toDelete));
      }
      prev.next = head;
    } else {
      prev.next = head;
      prev = head;
      head = head.next;
    }
  }
  return dummy.next;
}
