/**
 * LRU Cache
 * 
 * Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.
 * 
 * get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
 * put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.
 * 
 * Follow up:
 * Could you do both operations in O(1) time complexity?
 * 
 * Example:
 * 
 * LRUCache cache = new LRUCache( 2 capacity );
 * 
 * cache.put(1, 1);
 * cache.put(2, 2);
 * cache.get(1);       // returns 1
 * cache.put(3, 3);    // evicts key 2
 * cache.get(2);       // returns -1 (not found)
 * cache.put(4, 4);    // evicts key 1
 * cache.get(1);       // returns -1 (not found)
 * cache.get(3);       // returns 3
 * cache.get(4);       // returns 4
 */

import java.util.Map;

public class LRUCache {
    private setHead(DoublyListNode node) {
        node.prev = null;
        node.next = head;

        if (head != null) {
            head.prev = node;
        }

        head = node;

        if (tail == null) {
            tail = head;
        }
    }

    private remove(DoublyListNode node) {
        if (node.next != null) {
            node.next.prev = node.prev;
        } else {
            tail = node.prev;
        }

        if (node.prev != null) {
            node.prev.next = node.next;
        } else {
            head = node.next;
        }
    }

    private int capacity;
    DoublyListNode head;
    DoublyListNode tail;
    Map<Integer, DoublyListNode> keyToNodeMap; 

    LRUCache(int capacity) {
        this.capacity = capacity;
        head = tail = null;
        keyToNodeMap = new HashMap<Integer, DoublyListNode>(); 
    }

    public get(int key) {
        if (keyToNodeMap.containsKey(key)) {
            DoublyListNode node = keyToNodeMap.get(key);
            this.remove(node);
            this.setHead(node);
            return node.value;
        }

        return -1;
    }

    public set(int key, int value) {
        if (keyToNodeMap.containsKey(key)) {
            DoublyListNode node = keyToNodeMap.get(key);
            node.value = value;
            this.remove(node);
            this.setHead(node);
        } else {
            if (keyToNodeMap.size() == capacity) {
                this.remove(tail);
                keyToNodeMap.remove(tail.key);
            }
            DoublyListNode node = new DoublyListNode(key, value);
            this.setHead(node);
            keyToNodeMap.put(key, node);
        }
    }
}

public class DoublyListNode {
    int key;
    int value;
    DoublyListNode prev;
    DoublyListNode next;
    
    DoublyListNode(int key, int value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
}
