// 247. Strobogrammatic Number II
// Difficulty : Medium 

// A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

// Find all strobogrammatic numbers that are of length = n.

// For example,
// Given n = 2, return ["11","69","88","96"].

// Hint:
// Try to use recursion and notice that it should recurse with n - 2 instead of n - 1

// Time:  O(n^2 * 5^(n/2))
// Space: O(n)

class Solution {
public:
  vector<string> findStrobogrammatic(int n) {
    return findStrobogrammatic(n, n);
  }

  vector<string> findStrobogrammatic(const int n, int k) {
    if (k == 0) {
      return {""};
    } else if (k == 1) {
      return {"0", "1", "8"};
    }
    
    vector<string> result;
    for (auto num : findStrobogrammatic(n, k - 2)) {
      for (auto pair : lookup) {
        if (k != n || pair.first != "0") {
          result.emplace_back(pair.first + num + pair.second);
        }
      }
    }
    return result;
  }

private:
  const unordered_map<string, string> lookup{ {"0", "0"}, {"1", "1"}, {"6", "9"}, {"8", "8"}, {"9", "6"} };
};
