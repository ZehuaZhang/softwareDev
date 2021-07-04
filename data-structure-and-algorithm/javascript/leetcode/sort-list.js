/*
Given the head of a linked list, return the list after sorting it in ascending order.

Follow up: Can you sort the linked list in O(n logn) time and O(1) memory (i.e. constant space)?

 

Example 1:


Input: head = [4,2,1,3]
Output: [1,2,3,4]
Example 2:


Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]
Example 3:

Input: head = []
Output: []
 

Constraints:

The number of nodes in the list is in the range [0, 5 * 104].
-105 <= Node.val <= 105
*/

function sortList(head) {
    const dummy = new ListNode();
    dummy.next = head;

    let count = 0;
    for (; head; head = head.next, ++count);
    
    for (let i = 1; i < count; i *= 2) {
        for (let prev = dummy, curr = dummy.next; curr;) {
            const left = curr;
            const right = split(left, i);
            curr = split(right, i);
            prev = merge(left, right, prev);
        } 
    }
    
    return dummy.next;
}

function split(head, size) {
    if (!head) {
        return head
    }
    
    for (let i = 1; head.next && i < size; ++i) {
        head = head.next;
    }
    
    const right = head.next;
    head.next = null;
    return right;
}

function merge(left, right, prev) {
    for (; left && right; prev = prev.next) {
        if (left.val < right.val) {
            prev.next = left;
            left = left.next;
        } else {
            prev.next = right;
            right = right.next;
        }
    }
    
    prev.next = left ? left : right;
    for (; prev.next; prev = prev.next);
    return prev;
}

function sortList2(head) {
    if (!head || !head.next) {
        return head;
    }
    let prev = null, slow = head, fast = head;
    for (; fast && fast.next; slow = slow.next, fast = fast.next.next) {
        prev = slow;
    }

    if (fast) {
        prev = slow;
        slow = slow.next;
    }

    prev.next = null
    return merge(sortList(head), sortList(slow));

    function merge(l1, l2) {
        let dummy = new ListNode();
        let prev = dummy;
        for (; l1 && l2; prev = prev.next) {
            if (l1.val < l2.val) {
                prev.next = l1;
                l1 = l1.next;
            } else {
                prev.next = l2;
                l2 = l2.next;
            }
        }
        prev.next = l1 ? l1 : l2;
        return dummy.next;
    }
}