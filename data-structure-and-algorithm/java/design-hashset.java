
/**
 * Design HashSet
 * 
 * Design a HashSet without using any built-in hash table libraries.
 * 
 * To be specific, your design should include these functions:
 * 
 * add(value): Insert a value into the HashSet. 
 * contains(value) : Return whether the value exists in the HashSet or not.
 * remove(value): Remove a value in the HashSet. If the value does not exist in the HashSet, do nothing.
 * 
 * Example:
 * 
 * MyHashSet hashSet = new MyHashSet();
 * hashSet.add(1);         
 * hashSet.add(2);         
 * hashSet.contains(1);    // returns true
 * hashSet.contains(3);    // returns false (not found)
 * hashSet.add(2);          
 * hashSet.contains(2);    // returns true
 * hashSet.remove(2);          
 * hashSet.contains(2);    // returns false (already removed)
 * 
 * Note:
 * 
 * All values will be in the range of [0, 1000000].
 * The number of operations will be in the range of [1, 10000].
 * Please do not use the built-in HashSet library.
 */

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

public class MyHashSet {
    MyHashSet() {
        hash = new ArrayList<>(1000);
    }
    
    void add(int key) {
        int rowKey = key / 1000;
        if (hash.get(rowKey) == null) {
            hash.set(rowKey, new ArrayList<Boolean>(1000)); 
        }

        int colKey = key % 1000;
        hash.get(rowKey).set(colKey, true);
    }
    
    void remove(int key) {
        int rowKey = key / 1000;
        if (hash.get(rowKey) == null) {
            return;
        }

        int colKey = key % 1000;
        hash.get(rowKey).set(colKey, false);
    }
    
    Boolean contains(int key) {
        int rowKey = key / 1000;
        int colKey = key % 1000;

        return hash.get(rowKey) != null && hash.get(rowKey).get(colKey);
    }

    private List<List<Boolean>> hash;
};