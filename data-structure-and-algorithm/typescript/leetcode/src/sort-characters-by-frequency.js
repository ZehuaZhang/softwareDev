/*
Given a string s, sort it in decreasing order based on the frequency of characters, and return the sorted string.

 

Example 1:

Input: s = "tree"
Output: "eert"
Explanation: 'e' appears twice while 'r' and 't' both appear once.
So 'e' must appear before both 'r' and 't'. Therefore "eetr" is also a valid answer.
Example 2:

Input: s = "cccaaa"
Output: "aaaccc"
Explanation: Both 'c' and 'a' appear three times, so "aaaccc" is also a valid answer.
Note that "cacaca" is incorrect, as the same characters must be together.
Example 3:

Input: s = "Aabb"
Output: "bbAa"
Explanation: "bbaA" is also a valid answer, but "Aabb" is incorrect.
Note that 'A' and 'a' are treated as two different characters.
 

Constraints:

1 <= s.length <= 5 * 105
s consists of English letters and digits.
*/

function frequencySort(s) {
    const count = new Map();
    for (const c of s) {
        count.set(c, (count.has(c) ? count.get(c) : 0) + 1);
    }
    const bucket = [...Array(s.length + 1)].map(() => [])
    for (const [char, c] of count.entries()) {
        bucket[c].push(char);
    }
    const result = [];
    for (let i = bucket.length - 1; i >= 0; --i) {
        for (const c of bucket[i]) {
            result.push(c.repeat(i));
        }
    }
    return result.join("");
}