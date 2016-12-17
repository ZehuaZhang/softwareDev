312. Burst Balloons
Difficulty: Hard

Given n balloons, indexed from 0 to n-1. Each balloon is painted with a number on it represented by array nums. 
You are asked to burst all the balloons. If the you burst balloon i you will get nums[left] * nums[i] * nums[right] coins. 
Here left and right are adjacent indices of i. After the burst, the left and right then becomes adjacent.

Find the maximum coins you can collect by bursting the balloons wisely.

Note: 
(1) You may imagine nums[-1] = nums[n] = 1. They are not real therefore you can not burst them.
(2) 0 ≤ n ≤ 500, 0 ≤ nums[i] ≤ 100

Example:
Given [3, 1, 5, 8]

Return 167

    nums = [3,1,5,8] --> [3,5,8] -->   [3,8]   -->  [8]  --> []
   coins =  3*1*5      +  3*5*8    +  1*3*8      + 1*8*1   = 167

// Time:  O(n^3)
// Space: O(n^2)

class Solution {
public:
    int maxCoins(vector<int>& nums) {
        vector<int> coins;
        coins.emplace_back(1);
        for (auto num : nums) {
            if (num > 0) {
                coins.emplace_back(num);
            }
        }
        coins.emplace_back(1);
    
        vector<vector<int>> maxCoins(coins.size(), vector<int>(coins.size()));
        for (int len = 2; len < coins.size(); ++len) {
            for (int left = 0; left + len < coins.size(); ++left) {
                for (int i = left + 1, right = left + len; i < right; ++i) {
                    maxCoins[left][right] = max(maxCoins[left][right],
                         coins[left] * coins[i] * coins[right] +
                         maxCoins[left][i] + maxCoins[i][right]);
                }
            }
        }
    
        return maxCoins[0][coins.size() - 1];
    }
};
