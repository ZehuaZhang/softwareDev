276. Paint Fence
Difficulty : Easy  

There is a fence with n posts, each post can be painted with one of the k colors.

You have to paint all the posts such that no more than two adjacent fence posts have the same color.

Return the total number of ways you can paint the fence.

Note:
n and k are non-negative integers.

// Time:  O(n)
// Space: O(1)

// DP with rolling window.
class Solution {
public:
    int numWays(int n, int k) {
        if (n == 0) {
            return 0;
        }
        int same = 0, diff = k, res = same + diff;
        for (int i = 2; i <= n; ++i) {
            same = diff;
            diff = res * (k - 1);
            res = same + diff;
        }
        return res;
    }
};

0
    01 -> 010, 012, 011
    02 -> 020, 021, 022
    00 -> 001, 002, xxx

1
    10 -> 101, 102, 100
    12 -> 120, 121, 122
    11 -> 110, 112, xxx

2
    20 -> 201, 202, 200
    21 -> 210, 212, 211
    22 -> 220, 221, xxx
