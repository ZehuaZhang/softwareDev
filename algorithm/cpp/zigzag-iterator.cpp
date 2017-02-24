// 281. Zigzag Iterator
// Difficulty : Medium

// Given two 1d vectors, implement an iterator to return their elements alternately.

// For example, given two 1d vectors:
// v1 = [1, 2]
// v2 = [3, 4, 5, 6]
// By calling next repeatedly until hasNext returns false, the order of elements returned by next should be: [1, 3, 2, 4, 5, 6].

// Follow up: What if you are given k 1d vectors? How well can your code be extended to such cases?

// Clarification for the follow up question - Update (2015-09-18):
// The "Zigzag" order is not clearly defined and is ambiguous for k > 2 cases.
// If "Zigzag" does not look right to you, replace "Zigzag" with "Cyclic". For example, given the following input:

// [1,2,3]
// [4,5,6,7]
// [8,9]
// It should return [1,4,8,2,5,9,3,6,7].

/**
 * Your ZigzagIterator object will be instantiated and called as such:
 * ZigzagIterator i(v1, v2);
 * while (i.hasNext()) cout << i.next();
 */

// Time:  O(n)
// Space: O(k)

class ZigzagIterator {
public:
    ZigzagIterator(vector<int>& v1, vector<int>& v2) {
        if (!v1.empty()) {
            q.emplace(v1.cbegin(), v1.cend());
        }
        if (!v2.empty()) {
            q.emplace(v2.cbegin(), v2.cend());
        }
    }

    int next() {
        auto curr = q.top(); q.pop();
        int val = *curr.first++;
        if (curr.first != curr.second) {
            q.emplace(curr.first, curr.second);
        }
        return val;
    }

    bool hasNext() {
        return !q.empty();
    }

private:
    queue<pair<vector<int>::const_iterator, vector<int>::const_iterator>> q;
};


