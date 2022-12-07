/*
Given a string s, partition s such that every substring of the partition is a palindrome. Return all possible palindrome partitioning of s.

A palindrome string is a string that reads the same backward as forward.

 

Example 1:

Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]
Example 2:

Input: s = "a"
Output: [["a"]]
 

Constraints:

1 <= s.length <= 16
s contains only lowercase English letters.
*/

function partition(s) {
    const result = [];
    dfs(s, 0, [], result);
    return result;
}

function dfs(s, left, curr, result) {
    if (left === s.length) {
        result.push([...curr]);
    }

    for (let i = left; i < s.length; ++i) {
        if (isPalindrome(s, left, i)) {
            curr.push(s.substring(left, i + 1));
            dfs(s, i + 1, curr, result);
            curr.pop();
        }
    }
}

function isPalindrome(s, left, right) {
    for (;left < right; ++left, --right) {
        if (s[left] !== s[right]) {
            return false;
        }
    }
    return true;
}