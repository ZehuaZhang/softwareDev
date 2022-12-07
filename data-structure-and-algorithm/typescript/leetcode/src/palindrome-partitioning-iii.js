/*
You are given a string s containing lowercase letters and an integer k. You need to :

First, change some characters of s to other lowercase English letters.
Then divide s into k non-empty disjoint substrings such that each substring is a palindrome.
Return the minimal number of characters that you need to change to divide the string.

 

Example 1:

Input: s = "abc", k = 2
Output: 1
Explanation: You can split the string into "ab" and "c", and change 1 character in "ab" to make it palindrome.
Example 2:

Input: s = "aabbc", k = 3
Output: 0
Explanation: You can split the string into "aa", "bb" and "c", all of them are palindrome.
Example 3:

Input: s = "leetcode", k = 8
Output: 0
 

Constraints:

1 <= k <= s.length <= 100.
s only contains lowercase English letters.
*/

function palindromePartition(s, k) {

    // cost s[0, i] with j parts
    const result = [...Array(s.length + 1)].map(() => Array(k + 1).fill(s.length));

    // cost s[i,j] to palindrome
    const cost = [...Array(s.length)].map(() => Array(s.length).fill(0));
    
    result[0][0] = 0;
    for (let i = 1; i <= s.length; ++i){
        for (let j = 1; j <= k; ++j) {
            for (let left = i - 1; left >= 0; --left) {
                cost[left][i - 1] = (left + 1 < i - 1 ? cost[left + 1][i - 2] : 0) + (s[left] !== s[i - 1] ? 1 : 0);
                result[i][j] = Math.min(result[left][j - 1] + cost[left][i - 1], result[i][j]);
            }
        }
    }
    return result[s.length][k];
}