69. Sqrt(x)
Difficulty: Medium

Implement int sqrt(int x).

Compute and return the square root of x.

// Time Complexity: O(n)
// Space Complexity: O(1)

class Solution {
    public:
        int sqrt(int x) {
            int left = 1;
            int right = x;
            int prevMid = 0;

            while (left <= right) {
                int mid = left + (right - left) / 2;

                if(x / mid > mid) {
                    left = mid + 1;
                    prevMid = mid;
                } else if (x / mid < mid) {
                    right = mid - 1;
                } else {
                    return mid;
                }
            }

            return prevMid;
        }
};
