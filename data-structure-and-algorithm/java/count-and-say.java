/**
 * Count and Say
 *  
 * The count-and-say sequence is the sequence of integers beginning as follows:
 * 1, 11, 21, 1211, 111221, ...
 * 
 * 1 is read off as "one 1" or 11.
 * 11 is read off as "two 1s" or 21.
 * 21 is read off as "one 2, then one 1" or 1211.
 * 
 * Given an integer n, generate the nth sequence.
 * 
 * Note: The sequence of integers will be represented as a string.
 */

public class Solution {
    public String countAndSay(int n) {
        if (n <= 0) {
            return "";
        }
        
        String result = "1";
        for (int time = 2; time <= n; ++time) {
            StringBuilder stringBuilder = new StringBuilder();

            for (int i = 0; i < result.length();) {
                int count = 1;
                int j = i + 1;
                for (; j < result.length() && result.charAt(j) == result.charAt(j - 1); ++j) {
                    ++count;
                }
                stringBuilder
                    .append(count)
                    .append(result.charAt(i));
                i = j;
            }
            result = stringBuilder.toString(); 
        }

        return result;
    }
}