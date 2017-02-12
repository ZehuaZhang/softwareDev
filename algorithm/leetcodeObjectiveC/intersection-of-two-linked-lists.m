// 160. Intersection of Two Linked Lists
// Difficulty: Easy

// Write a program to find the node at which the intersection of two singly linked lists begins.


// For example, the following two linked lists:

// A:          a1 → a2
//                    ↘
//                      c1 → c2 → c3
//                    ↗
// B:     b1 → b2 → b3
// begin to intersect at node c1.


// Notes:

// If the two linked lists have no intersection at all, return null.
// The linked lists must retain their original structure after the function returns.
// You may assume there are no cycles anywhere in the entire linked structure.
// Your code should preferably run in O(n) time and use only O(1) memory.

// Time:  O(m + n)
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

ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
  ListNode* currA = headA, *currB = headB;
  while (currA != currB) {
    currA = currA ? currA.next : headB;
    currB = currB ? currB.next : headA;
  }
  return currA;
}
