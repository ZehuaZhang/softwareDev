// 86. Partition List
// Difficulty: Medium

// Given a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.

// You should preserve the original relative order of the nodes in each of the two partitions.

// For example,
// Given 1->4->3->2->5->2 and x = 3,
// return 1->2->2->4->3->5.

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

ListNode *partition(ListNode *head, int x) {
  ListNode *dummySmaller = [[ListNode alloc] init];
  ListNode *dummyLarger = [[ListNode alloc] init];
  ListNode *smaller = dummySmaller;
  ListNode *larger = dummyLarger;
  
  while (head) {
    if (head.value < x) {
      smaller.next = head;
      smaller = smaller.next;
    } else {
      larger.next = head;
      larger = larger.next;
    }
    head = head.next;
  }
  smaller.next = dummyLarger.next;
  larger.next = nil;
  
  return dummySmaller.next;
}

