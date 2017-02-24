// 149. Max Points on a Line
// Difficulty: Hard

// Given n points on a 2D plane, find the maximum number of points that lie on the same straight line.

// Time:  O(n^2)
// Space: O(n)

class Solution {
public:
    int maxPoints(vector<Point>& points) {
        int maxPoints = 0;
        for (int i = 0; i < points.size(); ++i) {
            unordered_map<double, int> slopeCount;
            auto start = points[i];
            int samePoints = 1;

            for (int j = i + 1; j < points.size(); ++j) {
                auto end = points[j];
                if (start.x == end.x && start.y == end.y) {
                    ++samePoints;
                } else {
                    double slope;
                    if (start.x - end.x != 0) {
                        slope = (start.y - end.y) * 1.0 / (start.x - end.x);
                    } else {
                        slope = numeric_limits<double>::infinity(); // or ::max();
                    }
                    ++slopeCount[slope];
                }
            }
            
            maxPoints = max(maxPoints, samePoints);
            for (auto slope : slopeCount) {
                maxPoints = max(maxPoints, slope.second + samePoints);
            }
        }
        return maxPoints;
    }
};
