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

function reverseWordsIII(input: string): string {
  const inputList = [...input];
  for (let left = 0, i = 0; i <= inputList.length; ++i) {
    if (i === inputList.length || inputList[i] === ' ') {
      reverse(left, i - 1);
      left = i + 1;
    }
  }
  return inputList.join('');

  function reverse(left = 0, right = inputList.length - 1) {
    for (; left < right; ++left, --right) {
      const t = inputList[left];
      inputList[left] = inputList[right];
      inputList[right] = t;
    }
    return inputList.join('');
  }
}
