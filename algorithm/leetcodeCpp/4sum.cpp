// 18. 4Sum
// Difficulty: Medium
// Given an array S of n integers, are there elements a, b, c, and d in S such that a + b + c + d = target? 
// Find all unique quadruplets in the array which gives the sum of target.

// Note: The solution set must not contain duplicate quadruplets.

// For example, given array S = [1, 0, -1, 0, -2, 2], and target = 0.

// A solution set is:
// [
//   [-1,  0, 0, 1],
//   [-2, -1, 1, 2],
//   [-2,  0, 0, 2]
// ]

// Time:  O(n^3)
// Space: O(1)

class Solution {
public:
    vector<vector<int> > fourSum(vector<int> &num, int target) {
        int len = num.size();
        int left, right, sum;
        sort(num.begin(), num.end());
        vector<vector<int>> res;

        for (int i = 0; i < len - 3; ++i) {
            if (i == 0 || num[i] != num[i - 1]) {
            
                for (int j = i + 1; j < len - 2; ++j) {
                    if (j == i + 1 || num[j] != num[j - 1]) {
                        
                        sum = target - num[i] - num[j];
                        for (int left = j + 1, right = len - 1; left < right;) {
                            
                            if (left > j + 1 && num[left] == num[left - 1]) {
                                left++;
                            } else if (right < len - 1 && num[right] == num[right + 1]) {
                                right--;
                            } else {            
                                if (num[left] + num[right] == sum) {
                                    res.push_back({num[i], num[j], num[left], num[right]});
                                    ++left, --right;
                                } else {
                                    if (num[left] + num[right] > sum) {
                                        --right;
                                    } else {
                                        ++left;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        return res;
    }
};