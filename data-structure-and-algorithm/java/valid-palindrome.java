/**
 * Valid Palindrome 
 * 
 * Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
 * 
 * For example,
 * "A man, a plan, a canal: Panama" is a palindrome.
 * "race a car" is not a palindrome.
 * 
 * Note:
 * Have you consider that the string might be empty? This is a good question to ask during an interview.
 * 
 * For the purpose of this problem, we define empty string as valid palindrome.
 */

public class Solution {
    public boolean isPalindrome(String s) {
        if (s == null) {
            throw new NullPointerException();
        }

        for (int left = 0, right = s.length() - 1; left < right;) {
            if (!Character.isAlphabetic(s.charAt(left)) && !Character.isDigit(s.charAt(left))) {
                ++left;
            } else if (!Character.isAlphabetic(s.charAt(right)) && !Character.isDigit(s.charAt(right))) {
                --right;
            } else if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            } else {
                ++left;
                --right;
            }
        }

        return true;
    }
}
