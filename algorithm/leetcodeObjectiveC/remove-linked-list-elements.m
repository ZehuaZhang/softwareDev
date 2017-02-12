// 203. Remove Linked List Elements
// Difficulty: Easy

// Remove all elements from a linked list of integers that have value val.

// Example
// Given: 1 --> 2 --> 6 --> 3 --> 4 --> 5 --> 6, val = 6
// Return: 1 --> 2 --> 3 --> 4 --> 5

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

ListNode* removeElements(ListNode* head, int val) {
  ListNode* dummy = [[ListNode alloc] init];
  dummy.next = head;
  
  for (ListNode* prev = dummy, *curr = head; curr; curr = curr.next) {
    if (curr.value == val) {
      prev.next = curr.next;
      free((__bridge void*)curr);
    } else {
      prev = curr;
    }
  }
  return dummy.next;
}
