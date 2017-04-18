// 465. Optimal Account Balancing
// Difficulty: Hard

// A group of friends went on holiday and sometimes lent each other money.
// For example, Alice paid for Bill's lunch for 10.ThenlaterChrisgaveAlice10.ThenlaterChrisgaveAlice5 for a taxi ride.
// We can model each transaction as a tuple (x, y, z) which means person x gave person y $z.
// Assuming Alice, Bill, and Chris are person 0, 1, and 2 respectively (0, 1, 2 are the person's ID),
// the transactions can be represented as [[0, 1, 10], [2, 0, 5]].

// Given a list of transactions between a group of people,
// return the minimum number of transactions required to settle the debt.

// Note:

// A transaction will be given as a tuple (x, y, z). Note that x ≠ y and z > 0.
// Person's IDs may not be linear, e.g. we could have the persons 0, 1, 2 or we could also have the persons 0, 2, 6.


// Example 1:

// Input:
// [[0,1,10], [2,0,5]]

// Output:
// 2

// Explanation:
// Person #0 gave person #1 $10.
// Person #2 gave person #0 $5.

// Two transactions are needed. One way to settle the debt is person #1 pays person #0 and #2 $5 each.


// Example 2:

// Input:
// [[0,1,10], [1,0,1], [1,2,5], [2,0,5]]

// Output:
// 1

// Explanation:
// Person #0 gave person #1 $10.
// Person #1 gave person #0 $1.
// Person #1 gave person #2 $5.
// Person #2 gave person #0 $5.

// Therefore, person #1 only need to give person #0 $4, and all debt is settled.

// Time:  O(n * 2^n), n is the size of the debt.
// Space: O(n * 2^n)

class Solution {
public:
  int minTransfers(vector<vector<int>>& transactions) {
    unordered_map<int, int> account;
    for (const auto& transaction : transactions) {
      account[transaction[0]] += transaction[2];
      account[transaction[1]] -= transaction[2];
    }

    vector<int> debt;
    for (const auto& kvp : account) {
      if (kvp.second) {
        debt.emplace_back(kvp.second);
      }
    }
    if (debt.empty()) {
      return 0;
    }

    const int n = 1 << debt.size();
    vector<int> dp(n, numeric_limits<int>::max()), subset;
    for (int i = 1; i < n; ++i) {
      int net = 0, number = 0;
      for (int j = 0; j < debt.size(); ++j) {
        if (i & 1 << j) {
          net += debt[j];
          ++number;
        }
      }
      if (net == 0) {
        dp[i] = number - 1;
        for (const auto& s : subset) {
          if ((i & s) == s) {
            if (dp[s] != numeric_limits<int>::max() && dp[i - s] != numeric_limits<int>::max()) {
              dp[i] = min(dp[i], dp[s] + dp[i - s]);
            }
          }
        }
        subset.emplace_back(i);
      }
    }
    return dp.back();
  }
};