/*
Given an array of strings arr. String s is a concatenation of a sub-sequence of arr which have unique characters.

Return the maximum possible length of s.

 

Example 1:

Input: arr = ["un","iq","ue"]
Output: 4
Explanation: All possible concatenations are "","un","iq","ue","uniq" and "ique".
Maximum length is 4.
Example 2:

Input: arr = ["cha","r","act","ers"]
Output: 6
Explanation: Possible solutions are "chaers" and "acters".
Example 3:

Input: arr = ["abcdefghijklmnopqrstuvwxyz"]
Output: 26
 

Constraints:

1 <= arr.length <= 16
1 <= arr[i].length <= 26
arr[i] contains only lower case English letters.
*/

function maxLength(arr) {
    const cache = new Map();
    return dfs(arr, "", 0 ,cache);
}

function dfs(arr, curr, idx, cache) {
    if (cache.has(curr)) {
        return cache.get(curr);
    }

    const set = new Set();
    for (const c of curr) {
        if (set.has(c)) {
            return 0;
        }
        set.add(c);
    }
    let max = curr.length;
    for (let i = idx; i < arr.length; ++i) {
        max = Math.max(max, dfs(arr, curr + arr[i], i + 1, cache));
    }
    cache.set(curr, max);
    return cache.get(curr);
}

function maxLengthBitCount(arr) {
    const dp = [0];
    let result = 0;
    for (const s of arr) {
        let a = 0, dup = 0;
        for (const c of s) {
            const bit = 1 << (c.charCodeAt(0) - 'a'.charCodeAt(0));
            dup |= a & bit;
            a |= bit
        }
        if (dup > 0) {
            continue;
        }
        for (let i = dp.length - 1; i >= 0; --i) {
            if (dp[i] & a) {
                continue;
            }
            const bitset = dp[i] | a;
            dp.push(bitset);
            result = Math.max(result, bitCount(bitset));
        }
    }
    return result;
}

function bitCount(n) {
    return n.toString(2).match(/1/g).length
}