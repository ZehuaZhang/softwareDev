164. Maximum Gap
Difficulty: Hard

Given an unsorted array, find the maximum difference between the successive elements in its sorted form.

Try to solve it in linear time/space.

Return 0 if the array contains less than 2 elements.

You may assume all elements in the array are non-negative integers and fit in the 32-bit signed integer range.

// Time:  O(n)
// Space: O(n)

class Solution {
public:
    struct Bucket {
        int max = INT_MIN;
        int min = INT_MAX;
    };

    int maximumGap(vector<int>& nums) {
        if (nums.size() < 2) {
            return 0;
        }

        // Init bucket.
        int maxVal = *max_element(nums.cbegin(), nums.cend());
        int minVal = *min_element(nums.cbegin(), nums.cend());
        int gap = max(1, (maxVal - minVal) / (nums.size() - 1));
        vector<Bucket> buckets((maxVal - minVal) / gap + 1);

        // Find the bucket where the n should be put.
        for (auto num : nums) {
            int i = (num - minVal) / gap;
            buckets[i].min = min(buckets[i].min, num);
            buckets[i].max = max(buckets[i].max, num);
        }

        // Maximum gap should not be smaller than any gap inside the bucket.
        // i.e. maxGap >= (maxVal - minVal) / (count - 1)
        // Thus, only count each bucket gap between the first and the last bucket.
        int maxGap = 0, preBucketMax = minVal;
        for (auto bucket : buckets) {
            if (bucket.min != INT_MAX) {
                maxGap = max(maxGap, bucket.min - preBucketMax);
                preBucketMax = bucket.max;
            }
        }
        // Count the last bucket.
        maxGap = max(maxGap, maxVal - preBucketMax);

        return maxGap;
    }
};