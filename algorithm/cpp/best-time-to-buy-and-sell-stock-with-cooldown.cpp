// 309. Best Time to Buy and Sell Stock with Cooldown
// Difficulty: Medium

// Say you have an array for which the ith element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. You may complete as many transactions as you like (ie, buy one and sell one share of the stock multiple times) with the following restrictions:

// You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).
// After you sell your stock, you cannot buy stock on next day. (ie, cooldown 1 day)
// Example:

// prices = [1, 2, 3, 0, 2]
// maxProfit = 3
// transactions = [buy, sell, cooldown, buy, sell]

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int maxProfit(vector<int>& prices) {
    int buy = INT_MIN, prevBuy = 0, sell = 0, prevSell = 0;
    for (int price : prices) {
      prevBuy = buy;
      buy = max(prevSell - price, buy);
      prevSell = sell;
      sell = max(prevBuy + price, sell);
    }
    return sell;
  }
};