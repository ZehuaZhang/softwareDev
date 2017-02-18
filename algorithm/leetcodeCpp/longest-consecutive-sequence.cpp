// 128. Longest Consecutive Sequence
// Difficulty: Hard

// Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

// For example,
// Given [100, 4, 200, 1, 3, 2],
// The longest consecutive elements sequence is [1, 2, 3, 4]. Return its length: 4.

// Your algorithm should run in O(n) complexity

// Time:  O(n)
// Space: O(n)

class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_map<int, bool> visited;

        for (auto num : nums) {
            visited[num] = false;
        }

        int maxLength = 1;
        for (auto num : nums) {
            if (visited[num]) {
                continue;
            }

            visited[num] = true;
            int lenth = 1;
            
            for (int lessNum = num - 1; visited.find(lessNum) != visited.end(); lessNum--) {
                visited[lessNum] = true;
                ++length;
            }

            for (int greaterNum = num + 1; visited.find(greaterNum) != visited.end(); greaterNum++) {
                visited[greaterNum] = true;
                ++length;
            }

            maxLength = max(maxLength, length);
        }
        return maxLength;
    }
};

// Time:  O(n)
// Space: O(n)
class Solution {
public:
    int longestConsecutive(vector<int> &nums) {
        unordered_map<int, int> mergedLength;
        int size = nums.size();
        int length = 1;
        for (int i = 0; i < size; i++) {
            if (mergedLength.find(nums[i]) != mergedLength.end()) {
                continue;
            }
            mergedLength[nums[i]] = 1;
            if (mergedLength.find(nums[i] - 1) != mergedLength.end()) {
                length = max(length, merge(mergedLength, nums[i] - 1, nums[i]));
            }
            if (mergedLength.find(nums[i] + 1) != mergedLength.end()) {
                length = max(length, merge(mergedLength, nums[i], nums[i] + 1));
            }
        }
        return size == 0 ? 0 : length;
    }
private:
    int merge(unordered_map<int, int> &mergedLength, int left, int right) {
        int upper = right + mergedLength[right] - 1;
        int lower = left - mergedLength[left] + 1;
        int length = upper - lower + 1;
        mergedLength[upper] = length;
        mergedLength[lower] = length;
        return length;
    }
};