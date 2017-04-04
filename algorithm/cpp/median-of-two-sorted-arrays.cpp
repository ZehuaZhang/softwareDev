// 4. Median of Two Sorted Arrays
// Difficulty: Hard

// There are two sorted arrays nums1 and nums2 of size m and n respectively.

// Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

// Example 1:
// nums1 = [1, 3]
// nums2 = [2]

// The median is 2.0
// Example 2:
// nums1 = [1, 2]
// nums2 = [3, 4]

// The median is (2 + 3)/2 = 2.5

// Time:  O(log(min(m, n)))
// Space: O(1)

class Solution {
public:
  double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
    const int m = A.size();
    const int n = B.size();
    int total = m + n;
    if (total & 1) {
      return find_kth(A.begin(), m, B.begin(), n, total / 2 + 1);
    } else {
      return (find_kth(A.begin(), m, B.begin(), n, total / 2) + find_kth(A.begin(), m, B.begin(), n, total / 2 + 1)) / 2.0;
    }
  }
private:
  template<typename It>
  int find_kth(It A, int m, It B, int n, int k) {
    if (m > n) {
      return find_kth(B, n, A, m, k);
    }
    if (m == 0) {
      return *(B + k - 1);
    }
    if (k == 1) {
      return min(*A, *B);
    }
    int ia = min(k / 2, m), ib = k - ia;
    if (*(A + ia - 1) < *(B + ib - 1)) {
      return find_kth(A + ia, m - ia, B, n, k - ia);
    } else if (*(A + ia - 1) > *(B + ib - 1)) {
      return find_kth(A, m, B + ib, n - ib, k - ib);
    } else {
      return *(A + ia - 1);
    }
  }
};