// 315. Count of Smaller Numbers After Self
// Difficulty: Hard

// You are given an integer array nums and you have to return a new counts array. 
// The counts array has the property where counts[i] is the number of smaller elements to the right of nums[i].

// Example:

// Given nums = [5, 2, 6, 1]

// To the right of 5 there are 2 smaller elements (2 and 1).
// To the right of 2 there is only 1 smaller element (1).
// To the right of 6 there is 1 smaller element (1).
// To the right of 1 there is 0 smaller element.
// Return the array [2, 1, 1, 0].

// Time:  O(nlogn)
// Space: O(n)
// Merge sort check inversion (80ms)

class Solution {
public:
  vector<int> countSmaller(vector<int>& nums) {
    vector<pair<int, int>> numIndex;
    for (int i = 0; i < nums.size(); ++i) {
      numIndex.emplace_back(nums[i], i);  // need to remember original index for counts array
    }
    vector<int> counts(nums.size());
    countAndMergeSort(numIndex, 0, numIndex.size() - 1, counts);
    return counts;
  }

private:
  void countAndMergeSort(vector<pair<int, int>>& numIndex, int start, int end, vector<int>& counts) {
    if (start >= end) {
      return;
    }
    int mid = start + (end - start) / 2;
    countAndMergeSort(numIndex, start, mid, counts);
    countAndMergeSort(numIndex, mid + 1, end, counts);

    int j = mid + 1;
    vector<pair<int, int>> merge;
    for (int i = start; i <= mid; ++i) {
      // Merge the two sorted arrays.
      while (j <= end && numIndex[i].first > numIndex[j].first) { // inversion - 1st half greater than 2nd half
        merge.emplace_back(numIndex[j++]);
      }
      merge.emplace_back(numIndex[i]);
      counts[numIndex[i].second] += j - (mid + 1);
    }
    // Copy merge back to numIndex.
    copy(merge.begin(), merge.end(), numIndex.begin() + start);
  }
};
