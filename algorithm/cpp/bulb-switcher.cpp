// 319. Bulb Switcher
// Difficulty: Medium

// There are n bulbs that are initially off. You first turn on all the bulbs. 
// Then, you turn off every second bulb. On the third round, you toggle every third bulb 
// (turning on if it's off or turning off if it's on). For the ith round, you toggle every i bulb. 
// For the nth round, you only toggle the last bulb. Find how many bulbs are on after n rounds.

// Example:
// Given n = 3. 

// At first, the three bulbs are [off, off, off].
// After first round, the three bulbs are [on, on, on].
// After second round, the three bulbs are [on, off, on].
// After third round, the three bulbs are [on, off, off]. 

// So you should return 1, because there is only one bulb is on.

// Time:  O(1)
// Space: O(1)

class Solution {
public:
    int bulbSwitch(int n) {
    	// state of bulbs <=> factors of numbers
    	// find all pairs of factors of a number to multiply to this number
    	// numbers are even if number is not square, while numbers are odd if number is square
    	// state of bulb is off, if even, (Initial off, then on -> off, on -> off)
        // thus, state of bulb <=> find all numbers with odd factor pairs <=> find the number of full squares.
        return static_cast<int>(sqrt(n));
    }
};
