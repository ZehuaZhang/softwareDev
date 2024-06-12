/*
118. Pascal's Triangle

Given an integer numRows, return the first numRows of Pascal's triangle.

In Pascal's triangle, each number is the sum of the two numbers directly above it as shown:


 

Example 1:

Input: numRows = 5
Output: [[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]
Example 2:

Input: numRows = 1
Output: [[1]]
 

Constraints:

1 <= numRows <= 30
*/

function generate(numRows: number): number[][] {
  const result: number[][] = [];

  for (let i = 0, prev: number[] = []; i < numRows; ++i) {
    const curr: number[] = Array(i + 1).fill(1);
    for (let j = 1; j < i; ++j) {
      curr[j] = prev[j - 1] + prev[j];
    }
    result.push(curr);
    prev = curr;
  }
  return result;
}
