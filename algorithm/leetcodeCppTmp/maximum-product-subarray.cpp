// 152. Maximum Product Subarray
// Difficulty: Medium

// Find the contiguous subarray within an array (containing at least one number) which has the largest product.

// For example, given the array [2,3,-2,4],
// the contiguous subarray [2,3] has the largest product = 6.

class Solution {
public:
    int maxProduct(vector<int>& nums) {
        if (nums.empty()) {
        	return 0;
        }
        // kadane algorithm, why currMin <=> '-' * '-' = '+'
        int maxVal = nums[0], currMax = nums[0], currMin = nums[0];
        for (int i = 1; i < nums.size(); ++i) {
            int prevMax = currMax, prevMin = currMin;
            currMax = max(max(nums[i], prevMax * nums[i]), prevMin * nums[i]);
            currMin = min(min(nums[i], prevMax * nums[i]), prevMin * nums[i]);
            maxVal = max(maxVal, currMax);
        }
        return maxVal;
    }
};