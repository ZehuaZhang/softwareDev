// 147. Insertion Sort List
// Difficulty: Medium

// Sort a linked list using insertion sort.

// Time:  O(n^2)
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

ListNode* insertionSortList(ListNode* head) {
  ListNode* dummy = [[ListNode alloc] init];
  
  for (ListNode* curr = head; curr;) {
    ListNode* position = nil;
    for (ListNode* prev = dummy; prev && prev.value <= curr.value; prev = prev.next) {
      position = prev;
    }
    ListNode *next = curr.next;
    curr.next = position.next;
    position.next = curr;
    curr = next;
  }
  
  return dummy.next;
}
