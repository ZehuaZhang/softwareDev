// 360. Sort Transformed Array
// Difficulty : Medium 

// Given a sorted array of integers nums and integer values a, b and c. Apply a function of the form f(x) = ax2 + bx + c to each element x in the array.

// The returned array must be in sorted order.

// Expected time complexity: O(n)

// Example:
// nums = [-4, -2, 2, 4], a = 1, b = 3, c = 5,

// Result: [3, 9, 15, 33]

// nums = [-4, -2, 2, 4], a = -1, b = 3, c = 5

// Result: [-23, -5, 1, 7]

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  vector<int> sortTransformedArray(vector<int>& nums, int a, int b, int c) {
    const auto f = [](int x, int a, int b, int c) {
      return a * x * x + b * x + c;
    };

    vector<int> result;
    if (nums.empty()) {
      return result;
    }

    int d = a > 0 ? -1 : 1; // a > 0 concave, decrease then increase; a < 0 convex, increase then decrease
    for (int left = 0, right = nums.size() - 1; left <= right;) {
      int yLeft = f(nums[left], a, b, c);
      int yRight = f(nums[right], a, b, c);
      
      if (d * yLeft < d * yRight) {
        result.emplace_back(yLeft);
        ++left;
      } else {
        result.emplace_back(yRight);
        --right;
      }
    }
    if (d == -1) {
      reverse(result.begin(), result.end());
    }

    return result;
  }
};
