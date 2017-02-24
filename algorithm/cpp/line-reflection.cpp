// 356. Line Reflection
// Difficulty : Medium 

// Given n points on a 2D plane, find if there is such a line parallel to y-axis that reflect the given set of points.

// Example 1:
// Given points = [[1,1],[-1,1]], return true.

// Example 2:
// Given points = [[1,1],[-1,-1]], return false.

// Follow up:
// Could you do better than O(n^2)?

// Hint:
// Find the smallest and largest x-value for all points.
// If there is a line then it should be at y = (minX + maxX) / 2.
// For each point, make sure that it has a reflected point in the opposite side.

// Time:  O(n)
// Space: O(n)

// Hash solution.
class Solution {
public:
    bool isReflected(vector<pair<int, int>>& points) {
        unordered_map<int, unordered_set<int>> groupsByY;
        int left = INT_MAX, right = INT_MIN;
        for (auto point : points) {
            groupsByY[point.second].emplace(point.first);
            left = min(left, point.first);
            right = max(right, point.first);
        }
        auto mid = left + right;
        for (auto group : groupsByY) {
            for (auto x : group.second) {
                if (!group.second.count(mid - x)) {
                    return false;
                }
            }
        }
        return true;
    }
};