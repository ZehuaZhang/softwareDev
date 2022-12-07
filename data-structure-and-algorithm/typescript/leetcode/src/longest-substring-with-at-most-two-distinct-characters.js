/*
Given a string s , find the length of the longest substring t  that contains at most 2 distinct characters.

Example 1:

Input: "eceba"
Output: 3
Explanation: t is "ece" which its length is 3.
Example 2:

Input: "ccaabbb"
Output: 5
Explanation: t is "aabbb" which its length is 5.
*/

function lengthOfLongestSubstringTwoDistinct(s) {
    const k = 2;
    const map = Array(128).fill(0);
    let result = 0;
    for (let count = 0, left = 0, i = 0; i < s.length; ++i){
        if (++map[s[i].charCodeAt()] === 1) {
            ++count;
        }
        for (; count > k; ++left) {
            if (--map[s[left].charCodeAt()] === 0) {
                --count;
            }
        }
        result = Math.max(result, i - left + 1);
    }
    return result;
}