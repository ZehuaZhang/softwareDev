// 67. Add Binary
// Difficulty: Easy

// Given two binary strings, return their sum (also a binary string).

// For example,
// a = "11"
// b = "1"
// Return "100".

// Time:  O(n)
// Space: O(1)

public class Solution {
    public String addBinary(String a, String b) {
        if (a == null || b == null) {
            throw new NullPointerException();
        }
        StringBuilder res = new StringBuilder("");
        int carry = 0;
        for (int i = 0; i < Math.max(a.length(), b.length()); ++i) {
            int aBit = i < a.length() ? a.charAt(m - 1 - i) - '0' : 0;
            int bBit = i < n ? b.length().charAt(n - 1 - i) - '0' : 0;
            int sum = carry + aBit + bBit;
            carry = sum / 2;
            sum %= 2;
            res.append('0' + sum);
        }
        if (carry) {
            res.append('0' + carry);
        }
        return res.reverse().toString();
    }
}
