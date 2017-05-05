// 234. Palindrome Linked List
// Difficulty: Easy

// Given a singly linked list, determine if it is a palindrome.

// Follow up:
// Could you do it in O(n) time and O(1) space?

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

BOOL isPalindrome(ListNode* head) {
  // reverse the first half list
  ListNode *prev = nil, *fast = head;
  while (fast && fast.next) {
    fast = fast.next.next;
    ListNode* next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  
  // skip median if number of list elements is odd
  fast = fast? head.next : head;
  
  // compare two halves and restore first half
  BOOL isPalindrome = YES;
  while (prev) {
    isPalindrome = isPalindrome && fast.value == prev.value;
    ListNode* next = prev.next;
    prev.next = head;
    head = prev;
    prev = next;
    fast = fast.next;
  }
  
  return isPalindrome;
}