84. Largest Rectangle in Histogram
Difficulty: Hard

Given n non-negative integers representing the histogram bar height where the width of each bar is 1,
find the area of largest rectangle in the histogram.

For example,
Given heights = [1,3,2,4],
return 6.

|
|            __
|      __   |  |
|     |  |__|  |
|   __|  |  |  |
|__|__|__|__|__|___


// Time:  O(n)
// Space: O(n)

class Solution {
public:
    int largestRectangleArea(vector<int>& heights) {
        stack<int> incHeights;  // store index of heights
        heights.push_back(0); // for final calculate
        int maxArea = 0;

        for (int i = 0; i < heights.size();) {
            if (incHeights.empty() || heights[i] > heights[incHeights.top()]) {
                incHeights.emplace(i++);
            } else {
                int idx = heights[incHeights.top()]; incHeights.pop();
                int len = incHeights.empty() ? i : i - incHeights.top() - 1;
                maxArea = max(maxArea, heights[idx] * len);
            }
        }

        return maxArea;
    }
};
