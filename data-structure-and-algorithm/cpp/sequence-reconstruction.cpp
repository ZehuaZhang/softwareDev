// 444. Sequence Reconstruction
// Difficulty: Medium

// Check whether the original sequence org can be uniquely reconstructed from the sequences in seqs.
// The org sequence is a permutation of the integers from 1 to n, with 1 ≤ n ≤ 104.
// Reconstruction means building a shortest common supersequence of the sequences in seqs
// (i.e., a shortest sequence so that all sequences in seqs are subsequences of it).
// Determine whether there is only one sequence that can be reconstructed from seqs and it is the org sequence.

// Example 1:

// Input:
// org: [1,2,3], seqs: [[1,2],[1,3]]

// Output:
// false

// Explanation:
// [1,2,3] is not the only one sequence that can be reconstructed,
// because [1,3,2] is also a valid sequence that can be reconstructed.
// Example 2:

// Input:
// org: [1,2,3], seqs: [[1,2]]

// Output:
// false

// Explanation:
// The reconstructed sequence can only be [1,2].
// Example 3:

// Input:
// org: [1,2,3], seqs: [[1,2],[1,3],[2,3]]

// Output:
// true

// Explanation:
// The sequences [1,2], [1,3], and [2,3] can uniquely reconstruct the original sequence [1,2,3].
// Example 4:

// Input:
// org: [4,1,5,2,6,3], seqs: [[5,2,6,3],[4,1,5,2]]

// Output:
// true

// Time:  O(n * s), n is the size of org, s is the size of seqs
// Space: O(n)

class Solution {
public:
  bool sequenceReconstruction(vector<int>& org, vector<vector<int>>& seqs) {
    if (seqs.empty()) {
      return false;
    }
    vector<int> idx(org.size() + 1);
    for (int i = 0; i < org.size(); ++i) {
      idx[org[i]] = i;
    }

    vector<bool> hasMatch(org.size() + 1);
    int cnt = org.size() - 1;
    for (const auto& seq : seqs) {
      for (int i = 0; i < seq.size(); ++i) {
        if (seq[i] <= 0 || seq[i] > org.size()) {
          return false;
        }
        if (i == 0) {
          continue;
        }
        if (idx[seq[i - 1]] >= idx[seq[i]]) {
          return false;
        }
        if (!hasMatch[seq[i - 1]] && idx[seq[i - 1]] + 1 == idx[seq[i]]) {
          hasMatch[seq[i - 1]] = true;
          --cnt;
        }
      }
    }
    return cnt == 0;
  }
};