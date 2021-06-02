/**
 * Longest Valid Parentheses
 * 
 * Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.
 * 
 * For "(()", the longest valid parentheses substring is "()", which has length = 2.
 * 
 * Another example is ")()())", where the longest valid parentheses substring is "()()", which has length = 4.
 */

public class Solution {
    public int longestValidParentheses(String s) {
        if (s == null) {
            throw new NullPointerException();
        }

        int result = 0, start = 0;
        Stack<Integer> indexStack = new Stack<Integer>();
        for (int i = 0; i < s.length(); ++i) {
            if (s.charAt(i) == '(') {
                indexStack.push(i);
            } else if (s.charAt(i) == ')') {
                if (indexStack.isEmpty()) {
                    start = i + 1;
                } else {
                    indexStack.pop();
                    result = indexStack.isEmpty() ?
                        Math.max(result, i - start + 1) :
                        Math.max(result, i - indexStack.peek());
                }
            }
        }
        return result;
    }
}
