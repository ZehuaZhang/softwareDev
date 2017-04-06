// 26. Remove Duplicates from Sorted Array
// Difficulty: Easy

// Given a sorted array, remove the duplicates in place such that each element appear only once and return the new length.

// Do not allocate extra space for another array, you must do this in place with constant memory.

// For example,
// Given input array nums = [1,1,2],

// Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively. 
// It doesnt matter what you leave beyond the new length.

// Time:  O(n)
// Space: O(1)

class Solution {
public:
	int removeDuplicates(vector<int>& nums) {
		const int k = 1; // element appears at most k times

    if (nums.size() <= k) {
      return nums.size();
    }

    int index = k;
    for (int i = k; i < nums.size(); i++) {
      if (nums[i] != nums[index - k]) {
        nums[index++] = nums[i];
      }
    }
    return index;
  }
};

// Time:  O(n)
// Space: O(1)

class Solution {
public:
  int removeDuplicates(vector<int>& nums) {
    int last = -1;
    for (const auto& num : nums) {
      if (last == -1 || nums[last] != num) {
        nums[++last] = num;
      }
    }
    return last + 1;
  }
};

// Time:  O(n)
// Space: O(1)

class Solution {
public:
	int removeDuplicates(vector<int>& nums) {
		return distance(nums.begin(), removeDuplicates(nums.begin(), nums.end(), nums.begin()));
	}
	template<typename It>
	It removeDuplicates(It first, It last, It output) {
		while (first != last) {
			*output++ = *first;
			first = upper_bound(first, last, *first);
		}
		return output;
	}
};