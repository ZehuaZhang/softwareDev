import java.util.Arrays;
import java.util.Set;

/**
 * Maximum Gap
 * 
 * Given an unsorted array, find the maximum difference between the successive elements in its sorted form.
 * 
 * Return 0 if the array contains less than 2 elements.
 * 
 * Example 1:
 * 
 * Input: [3,6,9,1]
 * Output: 3
 * Explanation: The sorted form of the array is [1,3,6,9], either
 *              (3,6) or (6,9) has the maximum difference 3.
 * Example 2:
 * 
 * Input: [10]
 * Output: 0
 * Explanation: The array contains less than 2 elements, therefore return 0.
 * Note:
 * 
 * You may assume all elements in the array are non-negative integers and fit in the 32-bit signed integer range.
 * Try to solve it in linear time/space.
 */

public class Solution {
    public int maximumGap(int[] nums) {
        if (nums == null) {
            throw new NullPointerException();
        }

        if (nums.length < 2) {
            return 0;
        }

        int min = Integer.MAX_VALUE;
        int max = Integer.MIN_VALUE;
        for (int num : nums) {
            min = Math.min(min, num);
            max = Math.max(max, num);
        }

        int bucketSize = (max - min) / nums.length + 1;
        int bucketCount = (max - min) / size + 1;
        
        int[] minBucket = new int[bucketCount];
        int[] maxBucket = new int[bucketCount];
        Arrays.fill(minBucket, Integer.MAX_VALUE);
        Arrays.fill(maxBucket, Integer.MIN_VALUE);
        
        Set<Integer> validBucketIndex = new Set<Integer>();

        for (int num : nums) {
            int index = (num - min) / size;
            minBucket[index] = Math.min(minBucket[index], num);
            maxBucket[index] = Math.min(maxBucket[index], num);
            validBucketIndex.add(index);
        }

        int prevIndexOfMaxBucket = 0, result = 0;
        for (int i = 0; i < bucketCount; ++i) {
            if (validBucketIndex.contains(i)) {
                result = Math.max(result, minBucket[i] - maxBucket[prevIndexOfMaxBucket]);
                prevIndexOfMaxBucket = i;
            }
        }

        return result;
    }
}
