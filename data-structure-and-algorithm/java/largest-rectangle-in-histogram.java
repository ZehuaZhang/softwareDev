/**
 * Largest Rectangle in Histogram
 * 
 * Given n non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.
 */

 import java.util.Stack;

public class Solution {
    public int largestRectangleArea(int[] height) {
        if (height == null) {
            throw new NullPointerException();
        }

        // add an zero element at the back to conviently calculate for the last height
        int[] heightList = new int[height.length + 1];
        for (int i = 0; i < height.length; ++i) {
            heightList[i] = height[i];
        }

        int maxArea = 0;
        Stack<Integer> heightIndexStack = new Stack<>();

        for (int i = 0; i < heightList.length; ++i) {
            while(!heightIndexStack.isEmpty() && heightList[heightIndexStack.peek()] >= heightList[i]) {
                int curr = heightIndexStack.pop();
                maxArea = Math.max(maxArea, heightList[curr] * (heightIndexStack.isEmpty() ? i : i - heightIndexStack.peek() - 1));
            }
            heightIndexStack.push(i);
        }

        return maxArea;
    }
}
