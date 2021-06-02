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

                System.out.format("num > max num = %d, max = %d, maxCount = %d, secondMax = %d, secondMaxCount = %d\n", num, max, maxCount, secondMax, secondMaxCount);
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

    public static void main(String[] args) {
        Solution solution = new Solution();
        int[] input = new int[] { 1, 2, 3, 4, 7, 5, 6, 7, 8, 9 };

        System.out.println(solution.singleNumberDeletionCountToFormNonDecreasingArray(input));
    }
}