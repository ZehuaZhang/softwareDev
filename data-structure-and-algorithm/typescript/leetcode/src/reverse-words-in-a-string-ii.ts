/*
Given an input string , reverse the string word by word.

Example:

Input:  ["t","h","e"," ","s","k","y"," ","i","s"," ","b","l","u","e"]
Output: ["b","l","u","e"," ","i","s"," ","s","k","y"," ","t","h","e"]
Note:

A word is defined as a sequence of non-space characters.
The input string does not contain leading or trailing spaces.
The words are always separated by a single space.
Follow up: Could you do it in-place without allocating extra space?
*/

function reverseWordsII(inputList: string[]): string[] {
  for (let left = 0, i = 0; i <= inputList.length; ++i) {
    if (i === inputList.length || inputList[i] === ' ') {
      reverse(left, i - 1);
      left = i + 1;
    }
  }
  reverse(0, inputList.length - 1);
  return inputList;

  function reverse(left = 0, right = inputList.length - 1) {
    for (; left < right; ++left, --right) {
      const t = inputList[left];
      inputList[left] = inputList[right];
      inputList[right] = t;
    }
    return inputList.join('');
  }
}
