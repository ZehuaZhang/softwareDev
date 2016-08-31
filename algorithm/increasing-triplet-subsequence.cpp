334. Increasing Triplet Subsequence
Difficulty: Medium

Given an unsorted array return whether an increasing subsequence of length 3 exists or not in the array.

Formally the function should:
Return true if there exists i, j, k 
such that arr[i] < arr[j] < arr[k] given 0 ≤ i < j < k ≤ n-1 else return false.
Your algorithm should run in O(n) time complexity and O(1) space complexity.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    bool increasingTriplet(vector<int>& nums) {
        int a = INT_MAX, b = INT_MAX;
        for (const auto& num : nums) {
            if (num <= a) {
                a = num;
            } else if (num <= b) {
                b = num;
            } else {    // a < b < num, or b < a < num
                return true;
            }
        }
        return false;
    }
};

// Time:  O(n * logk)
// Space: O(k)
// Generalization of k-uplet.
class Solution_Generalization {
public:
    bool increasingTriplet(vector<int>& nums) {
        int k = 3;
        vector<int> inc(k - 1, INT_MAX);
        for (const auto& num : nums) {
            auto it = lower_bound(inc.begin(), inc.end(), num);
            if (it == inc.end()) {
                return true;
            }
            *it = num;
        }
        return k == 0;
    }
};
