345. Reverse Vowels of a String
Difficulty: Easy

Write a function that takes a string as input and reverse only the vowels of a string.

Example 1:
Given s = "hello", return "holle".

Example 2:
Given s = "leetcode", return "leotcede".

Note:
The vowels does not include the letter "y".

// Time:  O(n)
// Space: O(1)

class Solution {
public:
    string reverseVowels(string s) {
        for (int i = 0, j = s.length() - 1; i < j;) {
            if (!isVowel(tolower(s[i]))) {
                ++i;
            } else if (!isVowel(tolower(s[j]))) {
                --j;
            } else {
                swap(s[i++], s[j--]);
            }
        }
        return s;
    }

private:
    bool isVowel(char a){
        return string("aeiou").find(a) != string::npos;
    }
};
