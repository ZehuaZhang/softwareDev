/**
 * Pow(x, n)
 *  
 * Implement pow(x, n).
 */

public class Solution {
    public double myPow(double x, int n) {
        if (n < 0) {
            return power(x, -n);
        }
        return power(x, n);
    }

    private double power(double x, int n) {
        if (n == 0) {
            return 1;
        }
        double half = power(x, n / 2);
        if (n % 2 == 0) {
            return half * half;
        }
        return half * half * x;
    }
}
