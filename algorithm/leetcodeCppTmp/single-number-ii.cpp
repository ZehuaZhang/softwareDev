137. Single Number II
Difficulty: Medium
Given an array of integers, every element appears three times except for one. Find that single one.

Note:
Your algorithm should have a linear runtime complexity. Could you implement it without using extra memory?

// Time:  O(n)
// Space: O(1)

class Solution {
public:
	int singleNumber(vector<int>& nums) {
		int one = 0, two = 0, three = 0;

		for (auto num : nums) {
			two |= (one & num);
			one ^= num;
			three = ~(one & two);
			one &= three;
			two &= three;
		}

		return one;
	}
};

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    int singleNumber(vector<int>& nums) {
        int one = 0, two = 0;

        for (auto num : nums) {
            int newOne = (~num & one) | (num & ~one & ~two);	// current number zeroes | current number ones
            int newTwo = (~num & two) | (num & one);
            one = newOne, two = newTwo;
        }

        return one;
    }
};

// Time:  O(n)
// Space: O(1)

class Solution {
public:
	int singleNumber(vector<int>& nums) {
		const int W = sizeof(int) * 8;
		int result = 0;

		for (int i = 0; i < W; j++) {
			int sum = 0;
			for (auto num : nums) {
				sum += (num >> i) & 1;
			}
			result |= (sum % 3) << i;
		}

		return result;
	}
}