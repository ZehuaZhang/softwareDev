
/**
 * Design HashMap
 * 
 * Design a HashMap without using any built-in hash table libraries.
 * 
 * To be specific, your design should include these functions:
 * 
 * put(key, value) : Insert a (key, value) pair into the HashMap. If the value already exists in the HashMap, update the value.
 * get(key): Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.
 * remove(key) : Remove the mapping for the value key if this map contains the mapping for the key.
 * 
 * Example:
 * 
 * MyHashMap hashMap = new MyHashMap();
 * hashMap.put(1, 1);          
 * hashMap.put(2, 2);         
 * hashMap.get(1);            // returns 1
 * hashMap.get(3);            // returns -1 (not found)
 * hashMap.put(2, 1);          // update the existing value
 * hashMap.get(2);            // returns 1 
 * hashMap.remove(2);          // remove the mapping for 2
 * hashMap.get(2);            // returns -1 (not found) 
 * 
 * Note:
 * 
 * All keys and values will be in the range of [0, 1000000].
 * The number of operations will be in the range of [1, 10000].
 * Please do not use the built-in HashMap library.
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

public class MyHashMap  {
    MyHashMap() {
        hash = new ArrayList<>(1000);
    }
    
    void put(int key, int value) {
        int rowKey = key / 1000;
        if (hash.get(rowKey) == null) {
            hash.set(rowKey, new ArrayList<Integer>(1000));
            for (int i = 0; i < 1000; ++i) {
                hash.get(rowKey).set(i, -1);
            }
        }

        int colKey = key % 1000;
        hash.get(rowKey).set(colKey, value);
    }
    
    void remove(int key) {
        int rowKey = key / 1000;
        if (hash.get(rowKey) == null) {
            return;
        }

        int colKey = key % 1000;
        hash.get(rowKey).set(colKey, -1);
    }
    
    Integer get(int key) {
        int rowKey = key / 1000;

        if (hash.get(rowKey) != null) {
            return hash.get(rowKey).get(colKey);
        }

        return -1;
    }

    private List<List<Integer>> hash;
};