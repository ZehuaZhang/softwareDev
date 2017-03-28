// 306. Additive Number
// Difficulty: Medium

// Additive number is a string whose digits can form additive sequence.

// A valid additive sequence should contain at least three numbers.
// Except for the first two numbers, each subsequent number in the sequence must be the sum of the preceding two.

// For example:
// "112358" is an additive number because the digits can form an additive sequence: 1, 1, 2, 3, 5, 8.

// 1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8
// "199100199" is also an additive number, the additive sequence is: 1, 99, 100, 199.
// 1 + 99 = 100, 99 + 100 = 199
// Note: Numbers in the additive sequence cannot have leading zeros, so sequence 1, 2, 03 or 1, 02, 3 is invalid.

// Given a string containing only digits '0'-'9', write a function to determine if its an additive number.

// Follow up:
// How would you handle overflow for very large input integers?

// Time:  O(n^3)
// Space: O(n)

public class Solution {
    public boolean isAdditiveNumber(String num) {
        if (num == null) {
            return false;
        }
        for (int i = 1; i < num.length(); ++i) {
            for (int j = i + 1; j < num.length(); ++j) {
                String s1 = num.substring(0, i);
                String s2 = num.substring(i, j - i);
                if ((s1.length() > 1 && s1.charAt(0) == '0') ||
                    (s2.length() > 1 && s2.charAt(0) == '0')) {
                    continue;
                }      
                String next = addTwoStrings(s1, s2);
                StringBuilder cur = new StringBuilder(s1 + s2 + next);
                while (cur.length() < num.length()) {
                    s1 = s2;
                    s2 = next;
                    next = addTwoStrings(s1, s2);
                    cur.append(next);
                }
                if (cur.toString().equals(num)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    private String addTwoStrings(String s1, String s2) {
        StringBuilder res = new StringBuilder("");
        int carry = 0;
        for (int i = 0; i < Math.max(s1.length(), s2.length()); ++i) {
            int aBit = i < s1.length() ? a.charAt(m - 1 - i) - '0' : 0;
            int bBit = i < s2.length() ? b.charAt(n - 1 - i) - '0' : 0;
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
