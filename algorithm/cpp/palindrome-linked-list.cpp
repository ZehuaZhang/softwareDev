// 234. Palindrome Linked List
// Difficulty: Easy

// Given a singly linked list, determine if it is a palindrome.

// Follow up:
// Could you do it in O(n) time and O(1) space?

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  bool isPalindrome(ListNode* head) {
    ListNode *prev = nullptr, *fast = head;
    while (fast && fast->next) {
      fast = fast->next->next;
      ListNode* next = head->next;
      head->next = prev;
      prev = head;
      head = next;
    }
    fast = fast? head->next : head; // skip median if number of list elements is odd

    bool isPalindrome = true;
    while (prev) {
      isPalindrome = isPalindrome && fast->val == prev->val;
      ListNode* next = prev->next;
      prev->next = head;
      head = prev;
      prev = next;
      fast = fast->next;
    }
    return isPalindrome;   
  }
};