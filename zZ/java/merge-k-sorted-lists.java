/**
 * Merge k Sorted Lists
 *  
 * Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.
 */

public class ListNode {
    int val;
    ListNode next;
    ListNode(int x) {
        val = x;
    }
}

public class Solution {
    private static class ListNodeComparator implements Comparator<ListNode> {
        @Override
        public int compare(ListNode n1, ListNode n2) {
            return n1.val - n2.val;
        }
    }

    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null) {
            throw new NullPointerException();
        }

        Queue<ListNode> priorityQueue = new PriorityQueue<>(new ListNodeComparator());
        for (ListNode list : lists) {
            if (list != null) {
                priorityQueue.add(list);
            }
        }

        ListNode precedingHeadPointer = new ListNode(0);
        ListNode curr = precedingHeadPointer;
        while (!priorityQueue.isEmpty()) {
            ListNode next = priorityQueue.poll();
            curr.next = next;
            curr = curr.next;
            if (next.next != null) {
                priorityQueue.add(next.next);
            }
        }

        return precedingHeadPointer.next;
    }
}
