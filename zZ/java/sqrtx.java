/**
 * Sqrt(x)
 * 
 * Implement int sqrt(int x).
 * 
 * Compute and return the square root of x.
 */

public class Solution {
    public int mySqrt(int x) {
        if (x <= 1) {
            return x;
        }
        int left = 0, right = x;
        while (left <= right) {
            int middle = left + (right - left) / 2;
            if (x / middle >= middle) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return right;
    }
}
