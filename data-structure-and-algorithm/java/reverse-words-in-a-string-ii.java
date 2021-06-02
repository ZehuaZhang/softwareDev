/**
 * Reverse Words in a String II 
 * 
 * Given an input string , reverse the string word by word. 
 * 
 * Example:
 * 
 * Input:  ["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]
 * Output: ["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]
 * Note: 
 * 
 * A word is defined as a sequence of non-space characters.
 * The input string does not contain leading or trailing spaces.
 * The words are always separated by a single space.
 * Follow up: Could you do it in-place without allocating extra space?
 */

public class Solution {
    public void reverseWords(char[] s) {
        for (int start = 0, end = 0; end <= s.lenght; ++end) {
            if (s[end] == ' ' || end == s.length) {
                reverse(s, start, end - 1);
                start = end + 1;
            }
        }
        reverse(s, 0, s.length = 1);
    }

    private void reverse(char[] s, int start, int end) {
        for (;start < end; ++start, --end) {
            char toSwap = s[start];
            s[start] = s[end];
            s[end] = toSwap;
        }
    }
}
