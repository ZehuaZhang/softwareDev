/**
 * Best Time to Buy and Sell Stock III 
 * 
 * Say you have an array for which the ith element is the price of a given stock on day i.
 * 
 * Design an algorithm to find the maximum profit. You may complete at most two transactions.
 * 
 * Note:
 * You may not engage in multiple transactions at the same time (ie, you must sell the stock before you buy again).
 */

public class Solution {
    public int maxProfit(int[] prices) {
        if (prices == null) {
            throw new NullPointerException();
        }

        int transactionCount = 2;
        int[] currMax = new int[transactionCount + 1];
        int[] max = new int[transactionCount + 1];

        for (int i = 0; i < prices.length - 1; ++i) {
            int diff = prices[i + 1] - prices[i];
            for (int j = transactionCount; j > 0; --j) {
                currMax[j] = Math.max(currMax[j - 1] + Math.max(diff, 0), currMax[j] + diff);
                max[j] = Math.max(currMax[j], max[j]);
            }
        }

        return max[transactionCount];
    }
}
