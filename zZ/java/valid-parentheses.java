/**
 * Valid Parentheses
 * 
 * Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.
 * 
 * The brackets must close in the correct order, "()" and "()[]{}" are all valid but "(]" and "([)]" are not.
 */

public class Solution {
    public boolean isValid(String s) {
        if (null == s) {
            throw new NullPointerException();
        }

        Stack<Character> stackForLeftParentheses = new Stack<Character>();
        for (int i = 0; i < s.length(); ++i) {
            char character = s.charAt(i);
            if (character == '(' ||
                character == '[' ||
                character == '{') {
                stackForLeftParentheses.push(character);
            } else {
                if (stackForLeftParentheses.isEmpty()) {
                    return false;
                }

                switch (character) {
                    case ')':
                        if (stackForLeftParentheses.peek() != '(') {
                            return false;
                        } else {
                            stackForLeftParentheses.pop();
                        }
                        break;
                    case ']':
                        if (stackForLeftParentheses.peek() != '[') {
                            return false;
                        } else {
                            stackForLeftParentheses.pop();
                        }
                        break;
                    case '}':
                        if (stackForLeftParentheses.peek() != '{') {
                            return false;
                        } else {
                            stackForLeftParentheses.pop();
                        }
                        break;
                }
            }
        }

        return stackForLeftParentheses.isEmpty();
    }
}