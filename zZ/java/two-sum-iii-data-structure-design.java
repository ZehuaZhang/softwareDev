/**
 * Two Sum III - Data structure design
 * 
 * Design and implement a TwoSum class. It should support the following operations:add and find.
 * 
 * add - Add the number to an internal data structure.
 * find - Find if there exists any pair of numbers which sum is equal to the value.
 * 
 * For example,
 * add(1); add(3); add(5);
 * find(4) -> true
 * find(7) -> false
 */

import java.util.HashMap;
import java.util.Map;

public class TwoSum {
    public void add(int number) {
        numberCount.put(number, numberCount.getOrDefault(number, 0) + 1);
    }

    public boolean find(int value) {
        for (Integer number : numberCount.keySet()) {
            int anotherNumber = value - number;
            if (numberCount.containsKey(anotherNumber) && (anotherNumber != number || numberCount.get(number) > 1)) {
                return true;
            }
        }

        return false;
    }

    private Map<Integer, Integer> numberCount = new HashMap<>();
}