// 60. Permutation Sequence
// Difficulty: Medium

// The set [1,2,3,…,n] contains a total of n! unique permutations.

// By listing and labeling all of the permutations in order,
// We get the following sequence (ie, for n = 3):

// "123"
// "132"
// "213"
// "231"
// "312"
// "321"
// Given n and k, return the kth permutation sequence.

// Time:  O(n^2)
// Space: O(n)

class Solution {
public:
    string getPermutation(int n, int k) {
        vector<int> nums;
        int total = 1;  // total permutations of n numbers
        for (int i = 1; i <= n; ++i) {
            nums.emplace_back(i);
            total *= i;
        }

        // Cantor Ordering: index = k / (n - 1)!     new k = k % (n - 1)!
        stringstream permutation;
        for (--k; n > 0; k %= total, --n) {
            total /= n;
            permutation << nums[k / total];
            nums.erase(nums.begin() +  k / total);  
        }

        return permutation.str();
    }
};
