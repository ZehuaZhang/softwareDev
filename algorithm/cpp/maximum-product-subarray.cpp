// 152. Maximum Product Subarray
// Difficulty: Medium

// Find the contiguous subarray within an array (containing at least one number) which has the largest product.

// For example, given the array [2,3,-2,4],
// the contiguous subarray [2,3] has the largest product = 6.

class Solution {
public:
  int maxProduct(vector<int>& nums) {
    // kadane algorithm, why currMin <=> '-' * '-' = '+'
    int maxVal = INT_MIN, currMax = 1, currMin = 1;
    for (auto num : nums) {
      int prevMax = currMax, prevMin = currMin;
      currMax = max(num, max(prevMax * num, prevMin * num));
      currMin = min(num, min(prevMax * num, prevMin * num));
      maxVal = max(maxVal, currMax);
    }
    return maxVal;
  }
};