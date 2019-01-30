/**
 * Largest Number 
 * 
 * Given a list of non negative integers, arrange them such that they form the largest number.
 * 
 * For example, given [3, 30, 34, 5, 9], the largest formed number is 9534330.
 * 
 * Note: The result may be very large, so you need to return a string instead of an integer.
 */

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Solution {
    private static class MyComparator implements Comparator<Integer> {
        @Override
        public int compare(Integer number1, Integer number2) {
            String string1 = String.valueOf(number1) + String.valueOf(number2);
            String string2 = String.valueOf(number2) + String.valueOf(number1);

            return string2.compareTo(string1);
        }
    }

    public String largestNumber(int[] nums) {
        List<Integer> numbers = new ArrayList<Integer>();
        for (int num : nums) {
            numbers.add(num);
        }

        Collections.sort(numbers, new MyComparator());
        
        String result = new String();
        for (int number : numbers) {
            result += String.valueOf(number);
        }

        if (result.charAt(0) == '0') {
            return "0";
        }
        return result;
    }
}