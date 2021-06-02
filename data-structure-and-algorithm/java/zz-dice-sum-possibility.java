/**
 * Now you have a dice, and throw it multiple times.
 * Find the possibility the sum of points is a target number
 */

import java.util.*;

public class Solution {
    public double getDiceSumPossibility(int diceCount, int target) {
        if (diceCount < 0 || target > 6 * diceCount || target < diceCount) {
            return 0.0;
        }

        int[][] cacheCount = new int[diceCount][target];
        
        return getDiceSumPossibilityHelper(diceCount, target, cacheCount);
    }

    public double getDiceSumPossibilityHelper(int diceCount, int target, int[][] cacheCount) {
        int result = 0;

        if (diceCount < 0 || target > 6 * dice || target < dice) {
            return result;
        }

        if (cacheCount[diceCount][target] != 0) {
            return cacheCount[diceCount][target];
        }

        for (int currDiceVal = 1; currDiceVal <= 6; ++currDiceVal) {
            result += getDiceSumPossibilityHelper(diceCount - 1, target - currDiceVal, cacheCount);
        }

        cacheCount[diceCount][target] = result;

        return result;
    }
}
