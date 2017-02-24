// 322. Coin Change
// Difficulty: Medium

// You are given coins of different denominations and a total amount of money amount. 
// Write a function to compute the fewest number of coins that you need to make up that amount. 
// If that amount of money cannot be made up by any combination of the coins, return -1.

// Example 1:
// coins = [1, 2, 5], amount = 11
// return 3 (11 = 5 + 5 + 1)

// Example 2:
// coins = [2], amount = 3
// return -1.

// Note:
// You may assume that you have an infinite number of each kind of coin.

// Time:  O(n * k), n is the number of coins, k is the amount of money
// Space: O(k)

// DP solution. (164ms)
class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        vector<int> amounts(amount + 1, INT_MAX);
        amounts[0] = 0;
        for (int i = 0; i <= amount; ++i) {
            if (amounts[i] != INT_MAX) {
                for (auto coin : coins) {
                    if (i + coin <= amount) {
                        amounts[i + coin] = min(amounts[i + coin], amounts[i] + 1);
                    }
                }
            }
        }
        return amounts[amount] == INT_MAX ? -1 : amounts[amount];
    }
};
