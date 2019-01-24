/**
 * Single Number II

Given an array of integers, every element appears three times except for one. Find that single one.

Note:
Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?
 */

public class Solution {
    public int singleNumber(int[] nums) {
        int one = 0, two = 0, three = 0;

        for (int num : nums) {
            two |= one & num;
            one ^= num;
            three = ~(one & two);
            one &= three;
            two &= three;
        }

        return one;
    }
}
