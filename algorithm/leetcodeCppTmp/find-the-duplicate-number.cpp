287. Find the Duplicate Number
Difficulty: Hard

Given an array nums containing n + 1 integers where each integer is between 1 and n (inclusive), 
prove that at least one duplicate number must exist. Assume that there is only one duplicate number, find the duplicate one.

Note:
You must not modify the array (assume the array is read only).
You must use only constant, O(1) extra space.
Your runtime complexity should be less than O(n2).
There is only one duplicate number in the array, but it could be repeated more than once.

// Time:  O(n)
// Space: O(1)

// Two pointers method, same as Linked List Cycle II.
class Solution {
public:
    int findDuplicate(vector<int>& nums) {
        int slow = nums[0];
        int fast = nums[nums[0]];
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[nums[fast]];
        }

        slow = 0;
        while (slow != fast) {
            slow = nums[slow];
            fast = nums[fast];
        }
        return slow;
    }
};

// Time:  O(n)
// Space: O(n)
class Solution3 {
public:
    int findDuplicate(vector<int>& nums) {
        int duplicate = 0;
        // Mark the value as visited by negative.
        for (auto num : nums) {
            if (nums[abs(num)] > 0) {
                nums[abs(num)] *= -1;
            } else {
                duplicate = abs(num);
            }
        }
        // Rollback the value.
        for (auto num : nums) {
            if (nums[abs(num)] < 0) {
                nums[abs(num)] *= -1;
            }
        }
        return duplicate;
    }
};
