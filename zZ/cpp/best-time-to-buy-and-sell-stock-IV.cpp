// 188. Best Time to Buy and Sell Stock IV
// Difficulty: Hard

// Say you have an array for which the ith element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. You may complete at most k transactions.

// Note:
// You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).

// Time:  O(n)
// Space: O(n)

class Solution {
public:
  int maxProfit(int k, vector<int>& prices) {
    if (k >= prices.size()) {
      return solveMaxProfit(prices);
    }
    const int transaction = k;
    int maxVal[transaction + 1] = {0};
    int currMax[transaction + 1] = {0};

    for (int i = 0; i < prices.size() - 1; ++i) {
      int diff = prices[i + 1] - prices[i];
      for (int j = transaction; j >= 1; --j) {
        // replace j's transaction, update j's transaction
        currMax[j] = max(maxVal[j - 1] + max(diff, 0), currMax[j] + diff);
        maxVal[j] = max(currMax[j], maxVal[j]);
      }
    }
    return maxVal[transaction];
  }

private:
  int solveMaxProfit(vector<int>& prices) {
    int maxVal = 0;
    for (int i = 1; i < prices.size(); ++i) {
      if (prices[i] - prices[i - 1] > 0) {
        maxVal += prices[i] - prices[i - 1];
      }
    }
    return maxVal;
  }
};