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

function palindromePartition(input: string): string[][] {
  const result: string[][] = [];
  const path: string[] = [];
  palindromePartitionDfs(0);
  return result;

  function palindromePartitionDfs(start: number): void {
    if (start === input.length) {
      result.push([...path]);
    }

    for (let i = start; i < input.length; ++i) {
      if (isPalindrome(start, i)) {
        path.push(input.substring(start, i + 1));
        palindromePartitionDfs(i + 1);
        path.pop();
      }
    }
  }

  function isPalindrome(left: number, right: number): boolean {
    for (; left < right; ++left, --right) {
      if (input[left] !== input[right]) {
        return false;
      }
    }
    return true;
  }
}
