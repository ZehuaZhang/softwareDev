/**
 * Decode Ways 
 * 
 * A message containing letters from A-Z is being encoded to numbers using the following mapping:
 * 
 * 'A' -> 1
 * 'B' -> 2
 * ...
 * 'Z' -> 26
 * Given an encoded message containing digits, determine the total number of ways to decode it.
 * 
 * For example,
 * Given encoded message "12", it could be decoded as "AB" (1 2) or "L" (12).
 * 
 * The number of ways decoding "12" is 2.
 */

public class Solution {
    public int numDecodings(String s) {
        if (s == null) {
            throw new NullPointerException();
        }

        if (s.length() == 0) {
            return 0;
        }

        int prevPrev = 0;
        int prev = 0;
        int curr = 1;
        for (int i = 0; i < s.length(); ++i) {
            if (s.charAt(i) == '0') {
                curr = 0;
            }

            if (i == 0 || !(s.charAt(i - 1) == '1' || (s.charAt(i - 1) == '2' && s.charAt(i) <= '6'))) {
                prev = 0;
            }

            prevPrev = prev;
            prev = curr;
            curr = prevPrev + prev;
        }

        return curr;
    }
}
