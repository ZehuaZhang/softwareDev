/**
 * Design Linked List 
 * 
 * Design your implementation of the linked list. You can choose to use the singly linked list or the doubly linked list.
 * A node in a singly linked list should have two attributes: val and next.
 * val is the value of the current node, and next is a pointer/reference to the next node.
 * If you want to use the doubly linked list, you will need one more attribute prev to indicate the previous node in the linked list. Assume all nodes in the linked list are 0-indexed.
 * 
 * Implement these functions in your linked list class:
 * 
 * get(index) : Get the value of the index-th node in the linked list. If the index is invalid, return -1.
 * addAtHead(val) : Add a node of value val before the first element of the linked list. After the insertion, the new node will be the first node of the linked list.
 * addAtTail(val) : Append a node of value val to the last element of the linked list.
 * addAtIndex(index, val) : Add a node of value val before the index-th node in the linked list.
 * If index equals to the length of linked list, the node will be appended to the end of linked list.
 * If index is greater than the length, the node will not be inserted.
 * deleteAtIndex(index) : Delete the index-th node in the linked list, if the index is valid.
 * Example:
 * 
 * MyLinkedList linkedList = new MyLinkedList();
 * linkedList.addAtHead(1);
 * linkedList.addAtTail(3);
 * linkedList.addAtIndex(1, 2);  // linked list becomes 1->2->3
 * linkedList.get(1);            // returns 2
 * linkedList.deleteAtIndex(1);  // now the linked list is 1->3
 * linkedList.get(1);            // returns 3
 * Note:
 * 
 * All values will be in the range of [1, 1000].
 * The number of operations will be in the range of [1, 1000].
 * Please do not use the built-in LinkedList library.
 */

import java.util.Arrays;

public class MyLinkedList  {
    MyLinkedList() {
        size = 0;
        head = tail = null;
    }

    int get(int index) {
        if (index < 0 || index >= size) {
            return -1;
        }

        Node curr = head;
        for (int i = 0; i < index; ++i) {
            curr = curr.next;
        }

        return curr.val;
    }

    void addAtHead(int val) {
        Node node = new Node(val);
        node.next = head;

        head = node;

        if (size == 0) {
            tail = head;
        }

        ++size;
    }

    void addAtTail(int val) {
        Node node = new Node(val);

        if (size != 0) {
            tail.next = node;
        }

        tail = node;

        if (size == 0) {
            head = tail;
        }

        ++size;
    }

    void addAtIndex(int index, int val) {
        if (index < 0 || index >= size) {
            return;
        }

        if (index == 0) {
            addAtHead(val);
            return;
        }

        if (index == size - 1) {
            addAtTail(val);
            return;
        }

        Node node = new Node(val);
        Node curr = head;
        for (int i = 0; i < index - 1; ++i) {
            curr = curr.next;
        }

        node.next = curr.next;
        curr.next = node;

        ++size;
    }

    void deleteAtIndex(int index) {
        if (index < 0 || index >= size) {
            return;
        }

        if (index == 0) {
            head = head.next;
            --size;
            return;
        }

        Node curr = head;
        for (int i = 0; i < index - 1; ++i) {
            curr = curr.next;
        }

        curr = curr.next.next;

        if (index == size - 1) {
            tail = curr;
        }

        --size;
    }

    private int size;
    private Node head;
    private Node tail;

    private class Node {
        int val;
        Node next;

        Node(int val) {
            this.val = val;
            next = null;
        }
    }
}
