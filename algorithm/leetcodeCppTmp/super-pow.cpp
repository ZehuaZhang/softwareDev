372. Super Pow
Difficulty: Medium

Your task is to calculate ab mod 1337 where a is a positive integer and 
b is an extremely large positive integer given in the form of an array.

Example1:
a = 2
b = [3]

Result: 8

Example2:
a = 2
b = [1,0]

Result: 1024

// Time:  O(n), n is the size of b.
// Space: O(1)

class Solution {
public:
    int superPow(int a, vector<int>& b) {
        int result = 1;
        for (auto digit : b) {
            result = myPow(result, 10, 1337) * myPow(a, digit, 1337) % 1337;
        }
        return result;
    }

private:
    int myPow(int a, int n, int mod) {
        int result = 1;
        int x = a % mod;
        while (n) {
            if (n & 1) {
                result = result * x % mod;
            }
            n >>= 1;
            x = x * x % mod;
        }
        return result % mod;
    }
};
