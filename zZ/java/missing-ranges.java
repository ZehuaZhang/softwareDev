/**
 * Missing Ranges
 * 
 * Given a sorted integer array where the range of elements are [0, 99] inclusive, return its missing ranges.
 * For example, given [0, 1, 3, 50, 75], return [“2”, “4->49”, “51->74”, “76->99”]
 */

import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<String> findMissingRanges(int[] nums, int lower, int upper) {
        if (nums == null) {
            throw new NullPointerException();
        }

        List<String> result = new ArrayList<>();

        if (nums.length == 0) {
            result.add(getRange(lower, upper));
            return result;
        }

        if (lower < nums[0]) {
            result.add(getRange(lower, nums[0] - 1));
        }

        for (int i = 1; i < nums.length; ++i) {
            if (nums[i] != nums[i - 1] + 1) {
                result.add(getRange(nums[i - 1] + 1, nums[i] - 1));
            }
        }

        if (upper > nums[nums.length - 1]) {
            result.add(getRannge(nums[nums.length - 1] + 1, upper));
        }

        return result;
    }

    private String getRange(int lower, int upper) {
        if (lower != upper) {
            return Integer.toString(lower) + "->" + Integer.toString(upper);
        } else {
            return Integer.toString(lower);
        }
    }
}
