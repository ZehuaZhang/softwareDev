// 2. Add Two Numbers
// Difficulty: Medium

// You are given two linked lists representing two non-negative numbers.
// The digits are stored in reverse order and each of their nodes contain a single digit. 
// Add the two numbers and return it as a linked list.

// Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
// Output: 7 -> 0 -> 8

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

ListNode *addTwoNumber(ListNode *L1, ListNode *L2) {
  ListNode *dummy = [[ListNode alloc] init];
  ListNode *curr = dummy;
  
  NSInteger carry = 0;
  
  while ( L1 || L2 || carry) {
    NSInteger a = L1 ? L1.value : 0;
    NSInteger b = L2 ? L2.value : 0;
    NSInteger sum = a + b + carry;
    NSInteger digit = sum % 10;
    carry = sum / 10;
    
    curr.next = [[ListNode alloc] initWithValue:digit];
    curr = curr.next;
    L1 = L1 ? L1.next : nil;
    L2 = L2 ? L2.next : nil;
  }

  return dummy.next;
}
