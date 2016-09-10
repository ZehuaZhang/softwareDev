9. Palindrome Number
Difficulty: Easy

Determine whether an integer is a palindrome. Do this without extra space.

Hint: 
Could negative integers be palindromes? (ie, -1)

If you are thinking of converting the integer to string, note the restriction of using extra space.

You could also try reversing an integer. However, if you have solved the problem "Reverse Integer", you know that the reversed integer might overflow. How would you handle such case?

There is a more generic way of solving this problem.

// Time:  O(logx) = O(1)
// Space: O(1)

class Solution {
public:
    bool isPalindrome(int x) {
        if (x < 0) {
            return false;
        }
        int temp = x;
        int reversed = 0;
        while (temp != 0) {
            reversed = reversed * 10 + temp % 10;
            temp /= 10;
        }
        return reversed == x;
    }
};

// Time:  O(logx) = O(1)
// Space: O(1)
class Solution2 {
public:
    bool isPalindrome(int x) {
        if(x < 0) {
            return false;
        }

        int divisor = 1;
        while (x / divisor >= 10) {
            divisor *= 10;
        }

        for (; x > 0; x = (x % divisor) / 10, divisor /= 100) {
            int left = x / divisor;
            int right = x % 10;
            if (left != right) {
                return false;
            }
        }

        return true;
    }
};
