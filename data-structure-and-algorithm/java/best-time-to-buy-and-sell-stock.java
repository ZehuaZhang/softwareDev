/**
 * Best Time to Buy and Sell Stock
 * 
 * Say you have an array for which the ith element is the price of a given stock on day i.
 * 
 * If you were only permitted to complete at most one transaction (ie, buy one and sell one share of the stock), design an algorithm to find the maximum profit.
 */

public class Solution {
    public int maxProfit(int[] prices) {
        if (prices == null) {
            throw new NullPointerException();
        }

        int result = 0, minStock = Integer.MAX_VALUE;
        for (int price : prices) {
            minStock = Math.min(minStock, price);
            result = Math.max(result, price - minStock);
        }

        return result;
    }
}
