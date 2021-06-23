/*
Given a string s, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.

 

Example 1:

Input: s = "Let's take LeetCode contest"
Output: "s'teL ekat edoCteeL tsetnoc"
Example 2:

Input: s = "God Ding"
Output: "doG gniD"
 

Constraints:

1 <= s.length <= 5 * 104
s contains printable ASCII characters.
s does not contain any leading or trailing spaces.
There is at least one word in s.
All the words in s are separated by a single space.
*/

function reverseWords(s) {
    let result = '';
    for (let i = 0; i < s.length; ++i) {
        if (s[i] !== ' ') {
            if (result.length !== 0) {
                result += ' ';
            }
            let j = i;
            for (; j < s.length && s[j] !== ' '; ++j) {
                result += s[j]
            }
            result = reverse(result, result.length - (j - i), result.length - 1)
            i = j;
        }
    }
    return result;
}

function reverse(s, l = 0, r = s.length - 1) {
    const a = [...s];
    for (; l < r; ++l, --r) {
        const t = a[l];
        a[l] = a[r];
        a[r] = t;
    }
    return a.join('');
}

function reverseWords2(s) {
    for (let l = 0, i = 0; i <= s.length; ++i) {
        if (i === s.length || s[i] === ' ') {
            s = reverse(s, l, i - 1);
            l = i + 1;
        }
    }

    return s;
}