/**
 * Generate Parentheses
 * 
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
 * 
 * For example, given n = 3, a solution set is:
 * 
 * "((()))", "(()())", "(())()", "()(())", "()()()"
 */

public class Solution {
    public List<String> generateParenthesis(int n) {
        List<String> result = new ArrayList<String>();

        generateParenthesisHelper(0, 0, new StringBuilder(), n, result);
        
        return result;
    }

    public void generateParenthesisHelper(int leftParenthesisCount, int rightParenthesisCount, StringBuilder path, int n, List<String>result) {
        if (rightParenthesisCount > leftParenthesisCount ||
            leftParenthesisCount > n ||
            rightParenthesisCount > n) {
            return;
        }
        
        if (leftParenthesisCount == rightParenthesisCount && leftParenthesisCount == n) {
            result.add(path.toString());
            return;
        } 
        
        path.append('(');
        generateParenthesisHelper(leftParenthesisCount + 1, rightParenthesisCount, path, n, result);
        path.deleteCharAt(path.length() - 1);

        path.append(')');
        generateParenthesisHelper(leftParenthesisCount, rightParenthesisCount + 1, path, n, result);
        path.deleteCharAt(path.length() - 1);
    }
}