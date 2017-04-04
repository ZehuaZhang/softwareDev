// 256. Paint House
// Difficulty : Medium 

// There are a row of n houses, each house can be painted with one of the three colors: 
// red, blue or green. The cost of painting each house with a certain color is different. 
// You have to paint all the houses such that no two adjacent houses have the same color.

// The cost of painting each house with a certain color is represented by a n x 3 cost matrix. 
// For example, costs[0][0] is the cost of painting house 0 with color red; 
// costs[1][2] is the cost of painting house 1 with color green, and so on... 
// Find the minimum cost to paint all houses.

// Note:
// All costs are positive integers.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int minCost(vector<vector<int>>& costs) {
    if (costs.empty()) {
      return 0;
    }    
    vector<vector<int>> minCost(2, costs[0]);

    const int n = costs.size();
    for (int i = 1; i < n; ++i) {
      minCost[i % 2][0] = costs[i][0] + min(minCost[(i - 1) % 2][1], minCost[(i - 1) % 2][2]);
      minCost[i % 2][1] = costs[i][1] + min(minCost[(i - 1) % 2][0], minCost[(i - 1) % 2][2]);
      minCost[i % 2][2] = costs[i][2] + min(minCost[(i - 1) % 2][0], minCost[(i - 1) % 2][1]);
    }
    return min(minCost[(n - 1) % 2][0], min(minCost[(n - 1) % 2][1], minCost[(n - 1) % 2][2]));
  }
};
