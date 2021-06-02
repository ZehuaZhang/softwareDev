
// given an array with non-negative numbers, find ways of deleting a single number to form non decreasing array

import java.util.*;

public class Solution {

    public int singleNumberDeletionCountToFormNonDecreasingArray(int[] nums) {
        int max = 0;
        int maxCount = 0;

        int secondMax = 0;
        int secondMaxCount = 0;

        for (int num : nums) {
            if (num > max) {
                secondMax = max;
                secondMaxCount = maxCount;

                max = num;
                maxCount = 1;
            } else if (num == max) {
                ++maxCount;
            } else {
                if (num < secondMax) {
                    return 0;
                } else if (num == secondMax) {
                    return secondMaxCount + maxCount;
                } else {
                    return maxCount;
                }
            }
        }

        return nums.length;
    }
}
