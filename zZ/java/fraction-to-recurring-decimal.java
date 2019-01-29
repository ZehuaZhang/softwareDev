/**
 * Fraction to Recurring Decimal
 * 
 * Given two integers representing the numerator and denominator of a fraction, return the fraction in string format.
 * 
 * If the fractional part is repeating, enclose the repeating part in parentheses.
 * 
 * For example,
 * 
 * Given numerator = 1, denominator = 2, return "0.5".
 * Given numerator = 2, denominator = 1, return "2".
 * Given numerator = 2, denominator = 3, return "0.(6)".
 * 
 * Credits:
 * Special thanks to @Shangrila for adding this problem and creating all test cases.
 */

import java.util.HashMap;
import java.util.Map;

public class Solution {
    public String fractionToDecimal(int numerator, int denominator) {
        if (denominator == 0) {
            throw new IllegalArgumentException();
        }

        String result = "";

        if ((numerator ^ denominator) >> 31 == 1 && numerator != 0) {
            result += "-";
        }

        long a = Math.abs(numerator);
        long b = Math.abs(denominator);
        result += Long.toString(a / b);

        if (a % b != 0) {
            result += ".";
        }

        Map<Long, Integer> index = new HashMap<>();
        for (a %= b; a != 0 && !index.containsKey(a); a %= b) {
            index.put(a, result.length());
            a *= 10;
            result += Long.toString(a / b);
        }

        if (index.containsKey(a)) {
            int position = index.get(a);
            result = result.substring(0, position) + "(" + result.substring(position) + ")";
        }

        return result;
    }
}
