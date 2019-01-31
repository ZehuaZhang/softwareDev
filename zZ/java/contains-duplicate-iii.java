/**
 * Contains Duplicate III
 * 
 * Given an array of integers, find out whether there are two distinct indices i and j in the array such that the difference between nums[i] and nums[j] is at most t and the difference between i and j is at most k.
 */

import java.util.TreeSet;

public class Solution {
    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        if (nums == null) {
            throw new NullPointerException();
        }

        if (nums.length < 2) {
            return false;
        }

        TreeSet<Integer> treeSet = new TreeSet<>();
        for (int i = 0; i < nums.length; ++i) {
            if (i - k - 1 >= 0) {
                treeSet.remove(nums[i - k - 1]);
            }
            
            Integer floor = treeSet.floor(nums[i]);
            Integer ceiling = treeSet.ceiling(nums[i]);

            if ((floor != null && Math.abs(floor - nums[i]) <= t) ||
                (ceiling != null && Math.abs(ceiling - nums[i]) <= t)) {
                return true;
            }

            treeSet.add(nums[i]);
        }

        return false;
    }
    public boolean containsNearbyAlmostDuplicate(int[] nums, int k, int t) {
        if (nums == null || nums.length <= 1 || t < 0) return false;
        if (k <= 0) return false;
        TreeSet<Integer> ts = new TreeSet<Integer>();
        ts.add(nums[0]);
        for (int i = 1; i < nums.length; ++i) {
            if (i - k - 1>= 0) ts.remove(nums[i - k - 1]);
            Integer floor = ts.floor(nums[i]);
            Integer ceil = ts.ceiling(nums[i]);

            if ((floor != null && (nums[i] - floor >= 0 && nums[i] - floor <= t)) 
                    || (ceil != null && (ceil - nums[i] >= 0 && ceil - nums[i] <= t))) {
                return true;
            }
            ts.add(nums[i]);
        }
        return false;
    }
}
