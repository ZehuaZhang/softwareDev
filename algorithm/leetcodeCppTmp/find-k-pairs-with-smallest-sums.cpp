373. Find K Pairs with Smallest Sums
Difficulty: Medium

You are given two integer arrays nums1 and nums2 sorted in ascending order and an integer k.

Define a pair (u,v) which consists of one element from the first array and one element from the second array.

Find the k pairs (u1,v1),(u2,v2) ...(uk,vk) with the smallest sums.

Example 1:
Given nums1 = [1,7,11], nums2 = [2,4,6],  k = 3
Return: [1,2],[1,4],[1,6]

The first 3 pairs are returned from the sequence:
[1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]

Example 2:
Given nums1 = [1,1,2], nums2 = [1,2,3],  k = 2
Return: [1,1],[1,1]

The first 2 pairs are returned from the sequence:
[1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]

Example 3:
Given nums1 = [1,2], nums2 = [3],  k = 3 
Return: [1,3],[2,3]

All possible pairs are returned from the sequence:
[1,3],[2,3]

// Time:  O(k * k * logk)
// Space: O(k)

class Solution {
public:
    vector<pair<int, int>> kSmallestPairs(vector<int>& nums1, vector<int>& nums2, int k) {
        vector<pair<int, int>> res;
        priority_queue<pair<int, int>, vector<pair<int, int>>, comp> q; // or use multimap
        for (int i = 0; i < min(nums1.size(), k); ++i) {
            for (int j = 0; j < min(nums2.size(), k); ++j) {
                if (q.size() < k) {
                    q.push({nums1[i], nums2[j]});
                } else if (nums1[i] + nums2[j] < q.top().first + q.top().second) {
                    q.push({nums1[i], nums2[j]}); q.pop();
                }
            }
        }
        while (!q.empty()) {
            res.push_back(q.top()); q.pop();
        }
        return res;
    }
    struct comp {
        bool operator() (pair<int, int> &a, pair<int, int> &b) {
            return a.first + a.second < b.first + b.second;
        }
    };
};

// Time:  O(k * log(min(n, m, k))), where n is the size of num1, and m is the size of num2.
// Space: O(min(n, m, k))

class Solution {
public:
    vector<pair<int, int>> kSmallestPairs(vector<int>& nums1, vector<int>& nums2, int k) {
        using P = pair<int, pair<int, int>>;
        priority_queue<P, vector<P>, greater<P>> q;
        auto push = [&nums1, &nums2, &q](int i, int j) {
            if (i < nums1.size() && j < nums2.size()) {
                q.emplace(nums1[i] + nums2[j], make_pair(i, j));
            }
        };

        push(0, 0);
        vector<pair<int, int>> pairs;

        while (!q.empty() && pairs.size() < k) {
            auto t = q.top(); q.pop();
            int i, j;
            tie(i, j) = tmp.second;
            pairs.emplace_back(nums1[i], nums2[j]);
            push(i, j + 1);
            if (j == 0) {
                push(i + 1, 0);  // at most queue min(m, n) space.
            }
        }
        return pairs; 
    }
};