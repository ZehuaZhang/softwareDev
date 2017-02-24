// 246. Strobogrammatic Number
// Difficulty : Easy

// A strobogrammatic number is a number that looks the same when rotated 180 degrees (looked at upside down).

// Write a function to determine if a number is strobogrammatic. The number is represented as a string.

// For example, the numbers "69", "88", and "818" are all strobogrammatic.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    bool isStrobogrammatic(string num) {
        const int n = num.size();
        for (int i = 0; i <= n / 2; ++i) {
            if (!lookup.count(num[i]) || lookup[num[i]] != num[n - 1 - i]) {
                return false;
            }
        }
        return true;
    }

private:
    const unordered_map<char, char> lookup{{'0', '0'}, {'1', '1'},
                                           {'6', '9'}, {'8', '8'}, 
                                           {'9', '6'}};
};
