/**
 * Add Binary
 * 
 * Given two binary strings, return their sum (also a binary string).
 * 
 * For example,
 * a = "11"
 * b = "1"
 * Return "100".
 */

public class Solution {
    public String addBinary(String a, String b) {
        if (a == null || b == null) {
            throw new NullPointerException();
        }

        StringBuilder stringBuilder = new StringBuilder();
        int aIndex = a.length(), bIndex = b.length();
        int carry = 0;
        while (aIndex >= 0 || bIndex >= 0 || carry == 1) {
            int aValue = --aIndex >= 0 ? a.charAt(aIndex) - '0' : 0;
            int bValue = --bIndex >= 0 ? b.charAt(bIndex) - '0' : 0;
            int sum = aValue + bValue + carry;
            stringBuilder.append(String.valueOf(sum % 2));
            carry = sum / 2;
        }

        return stringBuilder.reverse().toString();
    }
}
