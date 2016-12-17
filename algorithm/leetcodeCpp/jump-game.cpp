55. Jump Game
Difficulty: Medium

Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

For example:
A = [2,3,1,1,4], return true.

A = [3,2,1,0,4], return false.

// Time Complexity: O(n)
// Space Complexity: O(1)

class Solution {
    public:
        bool canJump(int A[], int n) {
            int reach = 0;
            for(int i = 0; i <= reach && i < n; ++i) {
                reach = max(reach, i + A[i]);
            }
            return reach >= n - 1;
        }
};
