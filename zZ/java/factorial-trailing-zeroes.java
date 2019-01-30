/**
 * Factorial Trailing Zeroes
 * 
 * Given an integer n, return the number of trailing zeroes in n!.
 * 
 * Note: Your solution should be in logarithmic time complexity.
 */

public class Solution {
    public int trailingZeroes(int n) {
        int result = 0;
        for (; n != 0; n /= 5) {
            result += n / 5;
        }

        return result;
    }
}
