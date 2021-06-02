/**
 * Container With Most Water 装最多水的容器
 * 
 * Given n non-negative integers a1, a2, ..., an, where each represents a point
 * at coordinate (i, ai). n vertical lines are drawn such that the two endpoints
 * of line i is at (i, ai) and (i, 0). Find two lines, which together with
 * x-axis forms a container, such that the container contains the most water.
 * 
 * Note: You may not slant the container.
 */

public class Solution {
    public int maxArea(int[] height) {
        if (height == null) {
            throw new NullPointerException();
        }

        if (height.length == 0) {
            return 0;
        }

        int left = 0, right = height.length - 1;
        int maxArea = (right - left) * Math.min(height[left], height[right]);
        while (left < right) {
            if (height[left] >= height[right]) {
                --right;
            } else {
                ++left;
            }
            maxArea = Math.max(maxArea, (right - left) * Math.min(height[left], height[right]));
        }

        return maxArea;
    }
}
