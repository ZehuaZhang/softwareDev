// 296. Best Meeting Point
// Difficulty: Medium 

// A group of two or more people wants to meet and minimize the total travel distance. You are given a 2D grid of values 0 or 1, where each 1 marks the home of someone in the group. The distance is calculated using Manhattan Distance, where distance(p1, p2) = |p2.x - p1.x| + |p2.y - p1.y|.

// For example, given three people living at (0,0), (0,4), and (2,2):

// 1 - 0 - 0 - 0 - 1
// |   |   |   |   |
// 0 - 0 - 0 - 0 - 0
// |   |   |   |   |
// 0 - 0 - 1 - 0 - 0
// The point (0,2) is an ideal meeting point, as the total travel distance of 2+2+2=6 is minimal. So return 6.

// Hint:
// Try to solve it in one dimension first. How can this solution apply to the two dimension case?

// Time:  O(m * n)
// Space: O(m + n)

class Solution {
public:
    int minTotalDistance(vector<vector<int>>& grid) {
        vector<int> x, y;
        for (int i = 0; i < grid.size(); ++i) {
            for (int j = 0; j < grid[0].size(); ++j) {
                if (grid[i][j]) {
                    x.emplace_back(i);
                    y.emplace_back(j);
                }
            }
        }
        // Find median, in even-number-of-element array, pick either 1st, or 2nd median 
        nth_element(x.begin(), x.begin() + x.size() / 2, x.end()); // O(n) average, worst O(n^2)
        nth_element(y.begin(), y.begin() + y.size() / 2, y.end()); 
        const int midX = x[x.size() / 2];
        const int midY = y[y.size() / 2];
        
        int sum = 0;
        for (int i = 0; i < grid.size(); ++i) {
            for (int j = 0; j < grid[0].size(); ++j) {
                if (grid[i][j]) {
                    sum += abs(midX - i) + abs(midY - j);
                }
            }
        }
        return sum;
    }
};
