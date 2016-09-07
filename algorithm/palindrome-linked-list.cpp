234. Palindrome Linked List
Difficulty: Easy

Given a singly linked list, determine if it is a palindrome.

Follow up:
Could you do it in O(n) time and O(1) space?

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
class Solution {
public:
    bool isPalindrome(ListNode* head) {
        // reverse the first half list
        ListNode *prev = nullptr, *fast = head;
        while (fast && fast->next) {
            fast = fast->next->next;
            ListNode* next = head->next;
            head->next = prev;
            prev = head;
            head = next;
        }

        // skip median if number of list elements is odd
        fast = fast? head->next : head;

        // compare two halves and restore first half
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

// Time:  O(n)
// Space: O(n)

class Solution2 {
public:
    bool isPalindrome(ListNode* head) {
        ListNode *slow = head, *fast = head;
        stack<int> s;
        while (fast && fast->next) {
            s.push(slow->val);
            slow = slow->next;
            fast = fast->next->next;
        }
        if (fast) {
            slow = slow->next;
        }
        while (slow) {
            int tmp = s.top(); s.pop();
            if (tmp != slow->val) return false;
            slow = slow->next;
            
        }
        return true;
    }
};
