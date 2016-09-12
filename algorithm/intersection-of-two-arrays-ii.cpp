350. Intersection of Two Arrays II
Difficulty: Easy

Given two arrays, write a function to compute their intersection.

Example:
Given nums1 = [1, 2, 2, 1], nums2 = [2, 2], return [2, 2].

Note:
Each element in the result should appear as many times as it shows in both arrays.
The result can be in any order.
Follow up:
What if the given array is already sorted? How would you optimize your algorithm?
What if nums1's size is small compared to nums2's size? Which algorithm is better?
What if elements of nums2 are stored on disk, and the memory is limited such that you cannot load all elements into the memory at once?

// If the given array is not sorted and the memory is unlimited:
//   - Time:  O(m + n)
//   - Space: O(min(m, n))
// elif the given array is already sorted:
//   if m << n or m >> n:
//     - Time:  O(min(m, n) * log(max(m, n)))
//     - Space: O(1)
//   else:
//     - Time:  O(m + n)
//     - Soace: O(1)
// else: (the given array is not sorted and the memory is limited)
//     - Time:  O(max(m, n) * log(max(m, n)))
//     - Space: O(1)

// If the given array is not sorted and the memory is unlimited.
// Time:  O(m + n)
// Space: O(min(m, n))
// Hash solution.
class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
        unordered_map<int, int> nums1map;
        for (auto num1 : nums1) {
            ++nums1map[num1];
        }

        vector<int> result;
        for (auto num2 : nums2) {
            if (nums1map[num2]-- > 0) {
                result.emplace_back(num2);
            }
        }

        return result;
    }
};


// If the given array is already sorted, and the memory is limited or m ~ n.
// Time:  O(m + n)
// Soace: O(1)
// Two pointers solution.
class Solution {
public:
    vector<int> intersect(vector<int>& nums1, vector<int>& nums2) {
        vector<int> result;
        // Make sure it is sorted, doesn't count in time.
        sort(nums1.begin(), nums1.end());
        sort(nums2.begin(), nums2.end());
        auto it1 = nums1.cbegin(), it2 = nums2.cbegin();
        while (it1 != nums1.cend() && it2 != nums2.cend()) {
            if (*it1 < *it2) {
                ++it1;
            } else if (*it1 > *it2) {
                ++it2;
            } else {
                result.emplace_back(*it1);
                ++it1, ++it2;
            }
        }
        return result;
    }
};