/**
 * Reverse Integer
 *  
 * Reverse digits of an integer.
 * 
 * Example1: x = 123, return 321
 * Example2: x = -123, return -321
 * 
 * click to show spoilers.
 * 
 * Have you thought about this?
 * Here are some good questions to ask before coding. Bonus points for you if you have already thought through this!
 * 
 * If the integer's last digit is 0, what should the output be? ie, cases such as 10, 100.
 * 
 * Did you notice that the reversed integer might overflow? Assume the input is a 32-bit integer, then the reverse of 1000000003 overflows. How should you handle such cases?
 * 
 * For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.
 * 
 * Update (2014-11-10):
 * Test cases had been added to test the overflow behavior.
 */

public class Solution {
    public int reverse(int x) {
        if (x == Integer.MIN_VALUE) return 0;
        if (x < 0) return -1 * reverse(-1 * x);
        // now we can assume that x >= 0;
        int res = 0;
        int toBeCompared = Integer.MAX_VALUE / 10;
        while (x != 0) {
            if (res > toBeCompared)
                return 0;
            res = res * 10 + x % 10;
            x = x / 10;
        }
        return res;
    }
}

public class Solution {
    public int reverse(int x) {
        if (x == Integer.MIN_VALUE) {
            return 0;
        }

        if (x < 0) {
            return -1 * reverse(-1 * x);
        }

        int result = 0;
        int toBeCompared = Integer.MAX_VALUE / 10;
        while (x != 0) {
            if (result > toBeCompared) {
                return 0;
            }

            result = result * 10 + x % 10;
            x = x / 10;
        }

        return result;
    }
}
