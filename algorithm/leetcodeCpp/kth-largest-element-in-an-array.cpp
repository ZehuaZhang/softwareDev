// 215. Kth Largest Element in an Array
// Difficulty: Medium

// Find the kth largest element in an unsorted array. 

// Note that it is the kth largest element in the sorted order, not the kth distinct element.

// For example,
// Given [3,2,1,5,6,4] and k = 2, return 5.

// Note: 
// You may assume k is always valid, 1 ≤ k ≤ array length.

// Time:  O(n) ~ O(n^2)
// Space: O(1)

class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        int left = 0, right = nums.size() - 1;
        while (left <= right) {
            int pivotIdx = left + rand() % (right - left + 1);
            int newPivotIdx = PartitionAroundPivot(left, right, pivotIdx, nums);
            if (newPivotIdx == k - 1) {
                return nums[newPivotIdx];
            } else if (newPivotIdx > k - 1) {
                right = newPivotIdx - 1;
            } else {
                left = newPivotIdx + 1;
            }
        }
        return nums[left];
    }
    
    int PartitionAroundPivot(int left, int right, int pivotIdx, vector<int>& nums) {
        swap(nums[pivotIdx], nums[right]);
        int pivot = nums[right];
        int newPivotIdx = left;
        for (int i = left; i < right; ++i) {
            if (nums[i] > pivot) {
                swap(nums[i], nums[newPivotIdx++]);
            }
        }
        swap(nums[right], nums[newPivotIdx]);
        return newPivotIdx;
    }
};
