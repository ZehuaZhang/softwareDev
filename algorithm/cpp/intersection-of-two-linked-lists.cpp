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

class Solution {
public:
    ListNode *getIntersectionNode(ListNode *headA, ListNode *headB) {
        ListNode *currA = headA, *currB = headB;
        while (currA != currB) {
            currA = currA ? currA->next : headB;
            currB = currB ? currB->next : headA;
        }        
        return currA;
    }
};
