// 23. Merge k Sorted Lists

// Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

// Example:

// Input:
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// Output: 1->1->2->3->4->4->5->6

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if (!isArray(lists)) {
        throw "invalid input types"
    }
    
    return mergeKListsHelper(lists, 0, lists.length - 1)
};

function isArray(item) {
    return Array.isArray(item)
}

function mergeKListsHelper(lists, leftIndex, rightIndex) {
    if (leftIndex > rightIndex) {
        return null
    }
    
    if (leftIndex === rightIndex) {
        return lists[leftIndex]
    }
    
    const middleIndex = leftIndex + Math.trunc((rightIndex - leftIndex) / 2)
    
    return mergeTwoLists(
        mergeKListsHelper(lists, leftIndex, middleIndex),
        mergeKListsHelper(lists, middleIndex + 1, rightIndex)
    )
}

function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(-1)
    let curr = dummy
    
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            curr.next = list1
            list1 = list1.next
        } else {
            curr.next = list2
            list2 = list2.next
        }
        
        curr = curr.next
    }
    
    curr.next = list1 ? list1 : list2
    return dummy.next
}