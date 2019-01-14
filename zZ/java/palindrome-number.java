/**
 * Palindrome Number
 * 
 * Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.
 * 
 * Example 1:
 * 
 * Input: 121
 * Output: true
 * Example 2:
 * 
 * Input: -121
 * Output: false
 * Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
 * Example 3:
 * 
 * Input: 10
 * Output: false
 * Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
 * Follow up:
 * 
 * Coud you solve it without converting the integer to a string?
 */

public class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0) return false;
        int tempX = x;
        int numDigit = 0;
        while (tempX > 0) {
            tempX = tempX / 10;
            ++numDigit;
        }
        
        for (int i = 0; i < numDigit/2; ++i) {
            if (getIthDigit(x, i) != getIthDigit(x, numDigit - 1 - i)) return false;
        }
        return true;
        
    }
    public int getIthDigit(int x, int i) {
        for (int j = 0; j < i; ++j) {
            x = x / 10;
        }
        return x % 10;
    }
}

public class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) {
            return false;
        }

        return reverse(x) == x;
    }

    public int reverse(int x) {
        int result = 0;
        while (x != 0) {
            if (result > Integer.MAX_VALUE / 10) {
                return - 1;
            }
            result = result * 10 + x % 10;
            x /= 10;
        }
        return result;
    }
}