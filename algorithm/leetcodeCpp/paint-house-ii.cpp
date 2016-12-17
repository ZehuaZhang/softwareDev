265. Paint House II
Difficulty : Hard 

There are a row of n houses, each house can be painted with one of the k colors. 
The cost of painting each house with a certain color is different. 
You have to paint all the houses such that no two adjacent houses have the same color.

The cost of painting each house with a certain color is represented by a n x k cost matrix. 
For example, costs[0][0] is the cost of painting house 0 with color 0; 
costs[1][2]is the cost of painting house 1 with color 2, and so on... 
Find the minimum cost to paint all houses.

Note:
All costs are positive integers.

Follow up:
Could you solve it in O(nk) runtime?

// Time:  O(n * k)
// Space: O(k)

class Solution {
public:
    int minCostII(vector<vector<int>>& costs) {
        if (costs.empty()) {
            return 0;
        }
        
        vector<vector<int>> minCost(2, costs[0]);

        const int n = costs.size();
        const int k = costs[0].size();
        for (int i = 1; i < n; ++i) {
            int minVal = INT_MAX, minVal2 = INT_MAX;

            // find prev house minCost, 2nd minCost
            for (int j = 0; j < k; ++j) {
                if (minCost[(i - 1) % 2][j] < minVal) {
                    minVal2 = minVal;
                    minVal = minCost[(i - 1) % 2][j];
                } else if (minCost[(i - 1) % 2][j] < minVal2) {
                    minVal2 = minCost[(i - 1) % 2][j];
                }
            }
            for (int j = 0; j < k; ++j) {
                int cost = (minCost[(i - 1) % 2][j] != minVal) ? minVal : minVal2;
                minCost[i % 2][j] = costs[i][j] + cost;
            }
        }

        return *min_element(minCost[(n - 1) % 2].cbegin(), minCost[(n - 1) % 2].cend());
    }
};
