42. Trapping Rain Water
Difficulty: Hard

Given n non-negative integers representing an elevation map where the width of each bar is 1, 
compute how much water it is able to trap after raining.

For example, 
Given [0,1,0,2,1,0,1,3,2,1,2,1], return 6.

// Time Complexity: O(n)
// Space Complexity: O(1)

class Solution {
public:
    int trap(int A[], int n) {
        const int n = A.size();
        stack<pair<int, int>> s;
        int water = 0;
        for (int i = 0; i < n; ++i) {
            int height = 0;
            while (!s.empty()) {
                int bar = s.top().first;
                int pos = s.top().second;
                water += (min(bar, A[i]) - height) * (i - pos - 1);
                height = bar;
                if (A[i] < bar) {
                    break;
                } else {
                    s.pop();
                }
            }
            s.push(make_pair(A[i], i));
        }
        return water;
    }
};
