/**
 * Valid Number
 * 
 * Validate if a given string is numeric.
 * 
 * Some examples:
 * "0" => true
 * " 0.1 " => true
 * "abc" => false
 * "1 a" => false
 * "2e10" => true
 * 
 * Note: It is intended for the problem statement to be ambiguous. You should gather all requirements up front before implementing one.
 */

public class Solution {
    public boolean isNumber(String s) {
        s = s.trim();
        if (s.length() == 0) {
            return false;
        }

        int i = 0;
        int exponetialPosition = s.indexOf('e');

        if (exponetialPosition == -1) {
            return isFloating(s);
        }
        return isFloating(s.substring(0, exponetialPosition)) && isInteger(s.substring(exponetialPosition + 1));
    }

    private boolean isFloating(String s) {
        if (s.length() == 0) {
            return false;
        }

        int dotPosition = s.indexOf('.');
        int start = 0;
        if (s.charAt(0) == '+' || s.charAt(0) == '-') {
            ++start;
        }

        if (dotPosition == -1) {
            return isUnsignedInteger(s.substring(start));
        } else {
            if (start == dotPosition) {
                return isUnsignedInteger(s.substring(dotPosition + 1));
            } else if (dotPosition == s.length() - 1) {
                return isUnsignedInteger(s.substring(start, dotPosition));
            } else {
                return isUnsignedInteger(s.substring(start, dotPosition)) &&
                    isUnsignedInteger(s.substring(dotPosition + 1));
            }
        }
    }

    private boolean isInteger(String s) {
        if (s.length() == 0) {
            return false;
        }

        int start = 0;
        if (s.charAt(start) == '+' || s.charAt(start) == '-') {
            ++start;
        }
        return isUnsignedInteger(s.substring(start));
    }

    private boolean isUnsignedInteger(String s) {
        if (s.length() == 0) {
            return false;
        }
        for (int i = 0; i < s.length(); ++i) {
            if (!Character.isDigit(s.charAt(i))) {
                return false;
            }
        }
        return true;
    }
}