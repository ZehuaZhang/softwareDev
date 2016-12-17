349. Intersection of Two Arrays
Difficulty: Easy

Given two arrays, write a function to compute their intersection.

Example:
Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2].

// Time:  O(m + n)
// Space: O(m)

// Hash solution.
class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        unordered_set<int> nums1set{nums1.cbegin(), nums1.cend()};

        vector<int> result;
        for (auto num2 : nums2) {
            if (nums1set.count(num2)) {
                result.emplace_back(num2);
                nums1set.erase(num2);
            }
        }

        return result;
    }
};


// Time:  O(max(m, n) * log(max(m, n)))
// Space: O(1)
// Two pointers solution.
class Solution3 {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        vector<int> result;
        sort(nums1.begin(), nums1.end());
        sort(nums2.begin(), nums2.end());
        auto it1 = nums1.cbegin(), it2 = nums2.cbegin();
        while (it1 != nums1.cend() && it2 != nums2.cend()) {
            if (*it1 < *it2) {
                ++it1;
            } else if (*it1 > *it2) {
                ++it2;
            } else {
                // avoid duplicate
                if (result.empty() || result.back() != *it1) {
                    result.emplace_back(*it1);
                }
                ++it1, ++it2;
            }
        }
        return result;
    }
};
