// 229. Majority Element II
// Difficulty: Medium

// Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times. 
// The algorithm should run in linear time and in O(1) space.

// Hint:
// How many majority elements could it possibly have?

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    vector<int> majorityElement(vector<int>& nums) {
        vector<int> res;
        int candidate0 = 0, candidate1 = 0, count0 = 0, count1 = 0;
        for (auto &num : nums) {
            if (num == candidate0) {
                ++count0;
            } else if (num == candidate1) {
                ++count1;
            } else if (count0 == 0) {
                candidate0 = num;
                count0 = 1;
            } else if (count1 == 0) {
                candidate1 = num;
                count1 = 1;
            } else {
                --count0;
                --count1;
            }
        }
        
        count0 = count1 = 0;
        for (auto num : nums) {
            if (num == candidate0) ++count0;
            else if (num == candidate1) ++count1;
        }

        if (count0 > nums.size() / 3) {
            res.push_back(candidate0);
        }
        if (count1 > nums.size() / 3) {
            res.push_back(candidate1);
        }
        return res;
    }
};
