// 24. Swap Nodes in Pairs
// Difficulty: Easy

// Given a linked list, swap every two adjacent nodes and return its head.

// For example,
// Given 1->2->3->4, you should return the list as 2->1->4->3.

// Your algorithm should use only constant space. You may not modify the values in the list, only nodes itself can be changed.

// Time:  O(n)
// Space: O(1)

/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */

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

ListNode* swapPairs(ListNode* head) {
  ListNode* dummy = [[ListNode alloc] init];
  dummy.next = head;
  ListNode* curr = dummy;
  while (curr.next && curr.next.next) {
    ListNode* nextOne = curr.next;
    ListNode* nextTwo = curr.next.next;
    
    curr.next = nextTwo;
    nextOne.next = nextTwo.next;
    nextTwo.next = nextOne;
    
    curr = nextOne;
  }
  return dummy.next;
}
