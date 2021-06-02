/**
 * One Edit Distance 
 * 
 * Given two strings S and T, determine if they are both one edit distance apart.
 */

public class Solution {
    public boolean isOneEditDistance(String s, String t) {
        if (s == null || t == null) {
            throw new NullPointerException();
        }

        if (Math.abs(s.length() - t.length()) > 1) {
            return false;
        }

        for (int i = 0; i < s.length(); ++i) {
            if (s.charAt(i) != t.charAt(i)) {
                if (s.length() == t.length()) {
                    return s.substring(i + 1).equals(t.substring(i + 1));
                } else if (s.length() < t.length()) {
                    return s.substring(i).equals(t.substring(i + 1));
                } else {
                    return s.substring(i + 1).equals(t.substring(i));
                }
            }
        }

        return false;
    }
}
