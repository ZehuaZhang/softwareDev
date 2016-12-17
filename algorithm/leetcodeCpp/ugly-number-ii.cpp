264. Ugly Number II
Difficulty: Medium

Write a program to find the n-th ugly number.

Ugly numbers are positive numbers whose prime factors only include 2, 3, 5.
For example, 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 is the sequence of the first 10 ugly numbers.

Note that 1 is typically treated as an ugly number.

Hint:
The naive approach is to call isUgly for every number until you reach the nth one. Most numbers are not ugly.
Try to focus your effort on generating only the ugly ones.
An ugly number must be multiplied by either 2, 3, or 5 from a smaller ugly number.
The key is how to maintain the order of the ugly numbers.
Try a similar approach of merging from three sorted lists: L1, L2, and L3.
Assume you have Uk, the kth ugly number. Then Uk+1 must be Min(L1 * 2, L2 * 3, L3 * 5).

// Time:  O(n)
// Space: O(1)
// Heap solution. (148ms)
class Solution {
public:
    int nthUglyNumber(int n) {
        long long ugly_number = 0;
        priority_queue<long long , vector<long long>, greater<long long>> heap;
        
        heap.emplace(1);
        for (int i = 0; i < n; ++i) {
            ugly_number = heap.top();
            heap.pop();
            if (ugly_number % 2 == 0) {
                heap.emplace(ugly_number * 2);
            } else if (ugly_number % 3 == 0) {
                heap.emplace(ugly_number * 2);
                heap.emplace(ugly_number * 3);
            } else {
                heap.emplace(ugly_number * 2);
                heap.emplace(ugly_number * 3);
                heap.emplace(ugly_number * 5);
            }
        }
        return ugly_number;   
    }
};

// Time:  O(n)
// Space: O(n)

// DP solution. (12ms)
class Solution2 {
public:
    int nthUglyNumber(int n) {
        vector<int> uglies(n);
        uglies[0] = 1;
    
        int factor2 = 2, factor3 = 3, factor5 = 5;
        int idx2 = 0, idx3 = 0, idx5 = 0;
    
        for (int i = 1; i < n; ++i) {
            int minVal = min(min(f2, f3), f5);
            uglies[i] = minVal;
    
            if (minVal == factor2) {
                factor2 = 2 * uglies[++idx2];
            }
            if (minVal == factor3) {
                factor3 = 3 * uglies[++idx3];
            }
            if (minVal == factor5) {
                factor5 = 5 * uglies[++idx5];
            }
        }
    
        return uglies[n - 1];
    }
};