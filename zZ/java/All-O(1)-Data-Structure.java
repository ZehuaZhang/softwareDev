/**
 * All O`one Data Structure 
 * 
 * Implement a data structure supporting the following operations:
 * 
 * Inc(Key) - Inserts a new key with value 1. Or increments an existing key by 1. Key is guaranteed to be a non-empty string.
 * Dec(Key) - If Key's value is 1, remove it from the data structure. Otherwise decrements an existing key by 1. If the key does not exist, this function does nothing. Key is guaranteed to be a non-empty string.
 * GetMaxKey() - Returns one of the keys with maximal value. If no element exists, return an empty string "".
 * GetMinKey() - Returns one of the keys with minimal value. If no element exists, return an empty string "".
 * 
 * Challenge: Perform all these in O(1) time complexity.
 */

import java.util.HashSet;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class AllOne  {
    AllOne () {
        head = new Bucket(Integer.MIN_VALUE);
        tail = new Bucket(Integer.MAX_VALUE);
        keyBucketMap = new HashMap<>();

        head.next = tail;
        tail.prev = head;
    }

    public void inc(String key) {
        if (keyBucketMap.containsKey(key)) {
            change(key, 1);
        } else {
            if (head.next.count != 1) {
                Bucket bucket = new Bucket(1);
                addNewBucketAfter(head, bucket);
            }
            keyBucketMap.put(key, head.next);
            head.next.keySet.add(key);            
        }
    }
    
    public void dec(String key) {
        if (keyBucketMap.containsKey(key)) {
            Bucket bucket = keyBucketMap.get(key);
            if (bucket.count != 1) {
                change(key, -1);
            } else {
                removeKeyFromBucket(key, bucket);
                keyBucketMap.remove(key);
            }
        }
    }
    
    public String getMaxKey() {
        if (tail.prev == head) {
            return "";
        }

        return tail.prev.keySet.iterator().next();
    }
    
    public String getMinKey() {
        if (head.next == tail) {
            return "";
        }

        return head.next.keySet.iterator().next();
    }

    private change(String key, int offset) {
        Bucket bucket = keyBucketMap.get(key);
        int count = bucket.count;
        int newCount = count + offset;

        Bucket nextBucket = offset > 0 ? bucket.next : bucket.prev;
        if (nextBucket.count != newCount) {
            nextBucket = new Bucket(newCount);
            addNewBucketAfter(offset > 0 ? bucket : bucket.prev, nextBucket);
        }

        keyBucketMap.put(key, nextBucket);
        nextBucket.keySet.add(key);
        removeKeyFromBucket(key, bucket);
    }

    private void removeKeyFromBucket(String key, Bucket bucket) {
        bucket.keySet.remove(key);
        if (bucket.keySet.isEmpty()) {
            removeBucketFromList(bucket);
        }
    }

    private void removeBucketFromList(Bucket bucket) {
        bucket.next.prev = bucket.prev;
        bucket.prev.next = bucket.next;
        bucket.next = null;
        bucket.prev = null;
    }

    private void addNewBucketAfter(Bucket bucket, Bucket newBucket) {
        newBucket.next = bucket.next;
        newBucket.prev = bucket;
        bucket.next.prev = newBucket;
        bucket.next = newBucket;
    }

    private Bucket head;
    private Bucket tail;
    private Map<String, Bucket> keyBucketMap;

    public class Bucket {
        int count;
        Set<String> keySet;

        Bucket prev;
        Bucket next;

        Bucket(int count) {
            this.count = count;
            this.keySet = new HashSet<>();

            prev = next = null;
        }
    }
}
