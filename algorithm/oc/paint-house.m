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

#import<Foundation/Foundation.h>

int minCost(NSArray* costs) {
  if (![costs count]) {
    return 0;
  }
  NSMutableArray* minCost = [NSMutableArray arrayWithObjects:[costs[0] mutableCopy], [costs[0] mutableCopy], nil];
  for (int i = 1; i < costs.count; ++i) {
    minCost[i % 2][0] = @([costs[i][0] intValue] + MIN([minCost[(i - 1) % 2][1] intValue], [minCost[(i - 1) % 2][2] intValue]));
    minCost[i % 2][1] = @([costs[i][1] intValue] + MIN([minCost[(i - 1) % 2][0] intValue], [minCost[(i - 1) % 2][2] intValue]));
    minCost[i % 2][2] = @([costs[i][2] intValue] + MIN([minCost[(i - 1) % 2][0] intValue], [minCost[(i - 1) % 2][1] intValue]));
  }
  return MIN([minCost[(costs.count - 1) % 2][0] intValue], MIN([minCost[(costs.count - 1) % 2][1] intValue], [minCost[(costs.count - 1) % 2][2] intValue]));
}
