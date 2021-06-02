/**
 * Multiply Strings
 *  
 * Given two numbers represented as strings, return multiplication of the numbers as a string.
 * 
 * Note: The numbers can be arbitrarily large and are non-negative.
 */

public class Solution {
    public String multiply(String num1, String num2) {
        if (num1 == null || num2 == null) {
            throw new NullPointerException();
        }

        // multiply
        int num1Length = num1.length();
        int num2Length = num2.length();
        int[] multiply = new int[num1Length + num2Length];
        for (int i = 0; i < num1Length; ++i) {
            for (int j = 0; j < num2Length; ++j) {
                multiply[num1Length + num2Length - 2 - i - j] += (num1.charAt(i) - '0') * (num2.charAt(j) - '0');
            }
        }

        // carry
        int carry = 0;
        for (int i = 0; i < num1Length + num2Length; ++i) {
            multiply[i] += carry;
            carry = multiply[i] / 10;
            multiply[i] %= 10;
        }

        // number is zero
        int i = num1Length + num2Length - 1;
        while (multiply[i--] == 0);
        if (i < 0) {
            return "0";
        }

        // number to string
        StringBuilder stringBuilder = new StringBuilder();
        while (i >= 0) {
            stringBuilder.append(multiply[i--] + '0');
        }
        return stringBuilder.toString();
    }
}
