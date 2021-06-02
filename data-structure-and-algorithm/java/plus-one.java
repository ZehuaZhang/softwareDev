/**
 * Plus One
 * 
 * Given a non-negative number represented as an array of digits, plus one to
 * the number.
 * 
 * The digits are stored such that the most significant digit is at the head of
 * the list.
 */

public class Solution {
    public int[] plusOne(int[] digits) {
        if (digits == null) {
            throw new NullPointerException();
        }

        for (int i = n - 1; i >= 0; --i) {
            if (digits[i] == 9) {
                digits[i] = 0; 
            } else {
                digits[i] += 1;
                return digits;
            }
        }

        if (digits[0] == 0) {
            int[] newDigits = new int[digits.length + 1];
            newDigits[0] = 1;
            return newDigits;
        }
        return digits;
    }
}
