/*
85. Maximal Rectangle

Given a rows x cols binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

 

Example 1:


Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.
Example 2:

Input: matrix = [["0"]]
Output: 0
Example 3:

Input: matrix = [["1"]]
Output: 1
 

Constraints:

rows == matrix.length
cols == matrix[i].length
1 <= row, cols <= 200
matrix[i][j] is '0' or '1'.
*/

function maximalRectangle(matrix: string[][]): number {
  const [m, n] = [matrix.length, matrix[0].length];
  const hghts = Array(n).fill(0);
  let result = 0;
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      hghts[j] = matrix[i][j] === '1' ? hghts[j] + 1 : 0;
    }
    result = Math.max(result, hist(hghts));
  }
  return result;

  function hist(hghts: number[]) {
    const list = [...hghts, 0];
    const idx: number[] = [];
    let area = 0;
    for (let i = 0; i < list.length; ) {
      if (idx.length === 0 || list[i] > list[idx[idx.length - 1]]) {
        idx.push(i++);
      } else {
        const hght = list[idx.pop()];
        const wdth = idx.length ? i - idx[idx.length - 1] - 1 : i;
        area = Math.max(area, hght * wdth);
      }
    }
    return area;
  }
}

// tests

const testInputListCollection = [
  [
    [
      ['1', '0', '1', '0', '0'],
      ['1', '0', '1', '1', '1'],
      ['1', '1', '1', '1', '1'],
      ['1', '0', '0', '1', '0'],
    ],
  ],
];

const expectedResultList = [6];

runTestCaseList(testInputListCollection, expectedResultList, maximalRectangle);
