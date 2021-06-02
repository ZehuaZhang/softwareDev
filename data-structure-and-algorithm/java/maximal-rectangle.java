/**
 * Maximal Rectangle
 * 
 * Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing all ones and return its area.
 */

import java.util.Stack;

public class Solution {
    public int maximalRectangle(char[][] matrix) {
        if (matrix == null) {
            throw new NullPointerException();
        }

        int maxArea = 0;
        if (matrix.length == 0 || matrix[0].length == 0) {
            return maxArea;
        }

        int[] heights = new int[matrix[0].length];
        for (int i = 0; i < matrix.length; ++i) {
            for (int j = 0; j < matrix[0].length; ++j) {
                heights[j] = matrix[i][j] == '1' ? 1 + heights[j] : 0;
            }
            maxArea = Math.max(maxArea, largestRectangleArea(heights));
        }
        return maxArea;
    }
    
    private int largestRectangleArea(int[] heights) {
        int[] heightList = new int[heights.length + 1];
        for (int i = 0; i < heights.length; ++i) {
            heightList[i] = heights[i];
        }
        
        int maxArea = 0;
        Stack<Integer> heightIndexStack = new Stack<>();

        for (int i = 0; i < heights.length; ++i) {
            while (!heightIndexStack.isEmpty() && heightList[heightIndexStack.peek()] >= heightList[i]) {
                int curr = heightIndexStack.pop();
                maxArea = Math.max(maxArea, heightList[curr] * (heightIndexStack.isEmpty() ? i : (i - heightIndexStack.peek() - 1)));
            }
            heightIndexStack.push(i);
        }

        return maxArea;
    }
}
