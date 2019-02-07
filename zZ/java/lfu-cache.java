/**
 * LFU Cache
 * 
 * Design and implement a data structure for Least Frequently Used (LFU) cache. It should support the following operations: get and put.
 * 
 * get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
 * put(key, value) - Set or insert the value if the key is not already present. When the cache reaches its capacity, it should invalidate the least frequently used item before inserting a new item. For the purpose of this problem, when there is a tie (i.e., two or more keys that have the same frequency), the least recently used key would be evicted.
 * 
 * Follow up:
 * Could you do both operations in O(1) time complexity?
 * 
 * Example:
 * 
 * LFUCache cache = new LFUCache(2);
 * 
 * cache.put(1, 1);
 * cache.put(2, 2);
 * cache.get(1);       // returns 1
 * cache.put(3, 3);    // evicts key 2
 * cache.get(2);       // returns -1 (not found)
 * cache.get(3);       // returns 3.
 * cache.put(4, 4);    // evicts key 1.
 * cache.get(1);       // returns -1 (not found)
 * cache.get(3);       // returns 3
 * cache.get(4);       // returns 4
 */

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class LFUCache {
    LFUCache (int capacity) {
        keyBucketMap = new HashMap<>();
        keyValueMap = new HashMap<>();
        head = new Bucket(Integer.MIN_VALUE);
        tail = new Bucket(Integer.MAX_VALUE);
        this.capacity = capacity;

        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (keyBucketMap.containsKey(key)) {
            change(key);
            return keyValueMap.get(key);
        }

        return -1;
    }
    
    public void put(int key, int value) {
        if (!keyBucketMap.containsKey(key)) {
            if (keyBucketMap.size == capacity) {
                int removeKey = head.next.keySet.iterator().next();
                removeKeyFromBucket(removeKey, head.next);
                keyBucketMap.remove(removeKey);
            }

            if (head.next.count != 1) {
                addNewBucketAfter(head, new Bucket(1));
            }
            keyBucketMap.put(key, head.next);
            head.next.keySet.add(key);
        } else {
            change(key);
        }

        keyValueMap.put(key, value);
    }

    private void change(int key) {
        Bucket bucket = keyBucketMap.get(key);
        int count = bucket.count;
        int newCount = count + 1;

        Bucket nextBucket = bucket.next;
        if (nextBucket.count != newCount) {
            nextBucket = new Bucket(count);
            addNewBucketAfter(bucket, newBucket);
        }

        keyBucketMap.put(key, nextBucket);
        nextBucket.keySet.add(key);
        removeKeyFromBucket(key, bucket);
    }

    private void removeKeyFromBucket(int key, Bucket bucket) {
        bucket.keySet.remove(key);
        if (bucket.keySet.isEmpty()) {
            removeBucketFromList(bucket);
        }
    }

    private void removeBucketFromList(Bucket bucket) {
        bucket.next.prev = bucket.prev;
        bucket.prev.next = bucket.next;
        bucket.prev = null;
        bucket.next = null;
    }

    private void addNewBucketAfter(Bucket bucket, Bucket newBucket) {
        newBucket.next = bucket.next;
        newBucket.prev = bucket;
        bucket.next.prev = newBucket;
        bucket.next = newBucket;
    }

    private Bucket head;
    private Bucket tail;
    private Map<Integer, Bucket> keyBucketMap;
    private Map<Integer, Integer> keyValueMap;
    private int capacity;

    private class Bucket {
        int count;
        Set<Integer> keySet;
        Bucket prev;
        Bucket next;

        Bucket(int count) {
            this.count = count;
            keySet = new HashSet<>();

            prev = null;
            next = null;
        }
    }
}
