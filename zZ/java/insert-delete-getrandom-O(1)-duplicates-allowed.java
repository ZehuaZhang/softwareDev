/**
 * Insert Delete GetRandom O(1) - Duplicates allowed
 * 
 * Design a data structure that supports all following operations in average O(1) time.
 * 
 * Note: Duplicate elements are allowed.
 *  
 * 
 * insert(val): Inserts an item val to the collection.
 * remove(val): Removes an item val from the collection if present.
 * getRandom: Returns a random element from current collection of elements. The probability of each element being returned is linearly related to the number of same value the collection contains.
 *  
 * 
 * Example:
 * 
 * // Init an empty collection.
 * RandomizedCollection collection = new RandomizedCollection();
 * 
 * // Inserts 1 to the collection. Returns true as the collection did not contain 1.
 * collection.insert(1);
 * 
 * // Inserts another 1 to the collection. Returns false as the collection contained 1. Collection now contains [1,1].
 * collection.insert(1);
 * 
 * // Inserts 2 to the collection, returns true. Collection now contains [1,1,2].
 * collection.insert(2);
 * 
 * // getRandom should return 1 with the probability 2/3, and returns 2 with the probability 1/3.
 * collection.getRandom();
 * 
 * // Removes 1 from the collection, returns true. Collection now contains [1,2].
 * collection.remove(1);
 * 
 * // getRandom should return 1 and 2 both equally likely.
 * collection.getRandom();
 */

import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Stack;
import java.util.ArrayList;
import java.util.HashMap;

public class RandomizedCollection  {
    RandomizedCollection () {
        numbers = new ArrayList<>();
        indexMap = new HashMap<>();
    }
        
    public boolean insert(int val) {
        boolean isUnique = true;
        if (indexMap.containsKey(val)) {
            isUnique = false;
        }

        List<Integer> indexList = indexMap.getOrDefault(val, new ArrayList<>());
        indexList.add(numbers.size());
        indexMap.put(val, indexList);

        numbers.add(val);

        return isUnique;
    }
    
    public boolean remove(int val) {
        if (!indexMap.containsKey(val)) {
            return false;
        }

        int lastEntryVal = numbers.get(numbers.size() - 1);
        List<Integer> lastEntryIndexList = indexMap.get(lastEntryVal);
        List<Integer> indexList = indexMap.get(val);
        int lastIndexOfIndexList = indexList.get(indexList.size() - 1);

        numbers.set(lastIndexOfIndexList, lastEntryVal);
        lastEntryIndexList.remove(lastEntryIndexList.size() - 1);
        lastEntryIndexList.add(lastIndexOfIndexList);

        numbers.remove(numbers.size() - 1);
        indexList.remove(indexList.size() - 1);
        if (indexList.isEmpty()) {
            indexMap.remove(val);
        } 

        return true;
    }
    
    int getRandom() {
        Random random = new Random();
        return numbers.get(random.nextInt(numbers.size()));
    }

    private List<Integer> numbers;
    private Map<Integer, List<Integer>> indexMap;
}