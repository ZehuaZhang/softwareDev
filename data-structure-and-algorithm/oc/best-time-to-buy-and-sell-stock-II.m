// 122. Best Time to Buy and Sell Stock II
// Difficulty: Medium

// Say you have an array for which the ith element is the price of a given stock on day i.

// Design an algorithm to find the maximum profit. You may complete as many transactions as you like
// (ie, buy one and sell one share of the stock multiple times).
// However, you may not engage in multiple transactions at the same time
//  (ie, you must sell the stock before you buy again).

// Time : O(n)
// Space: O(1)

#import <Foundation/Foundation.h>

int maxProfit(NSArray* prices) {
  int ans = 0;
  
  for (NSInteger i = 1; i < [prices count]; ++i) {
    int diff = [prices[i] intValue]- [prices[i - 1] intValue];
    if (diff > 0)
      ans += diff;
  }
  
  return ans;
}