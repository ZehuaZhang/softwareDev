/**
 * Divide Two Integers
 * 
 * Divide two integers without using multiplication, division and mod operator.
 * 
 * If it is overflow, return MAX_INT.
 */

public class Solution {
    public int divide(int dividend, int divisor) {
        if (divisor == 0) {
            throw new IllegalArgumentException("Divisor cannot be zero!");
        }
        if (dividend == Integer.MIN_VALUE && divisor == -1) {
            return Integer.MAX_VALUE;
        }
        if (divisor == Integer.MIN_VALUE) {
            if (dividend == Integer.MIN_VALUE) {
                return 1;
            }
            return 0;
        }

        int sign = 1;
        if ((dividend < 0 && divisor > 0) || (dividend > 0 && divisor < 0)) {
            sign = -1;
        }

        long newDividend = Math.abs((long)dividend);
        long newDivisor = Math.abs((long)divisor);
        int result = 0;
        while (newDividend >= newDivisor) {
            long value = newDivisor;
            int multiple = 1;
            while (newDividend >= (value << 1)) {
                value <<= 1;
                multiple <<= 1;
            }
            result += multiple;
            newDividend -= value;
        }

        if (sign == -1) {
            result = -result;
        }
        return result;
    }
}
