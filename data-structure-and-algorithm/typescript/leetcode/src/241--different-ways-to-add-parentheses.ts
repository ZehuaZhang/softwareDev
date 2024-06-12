/*
241. Different Ways to Add Parentheses

Given a string expression of numbers and operators, return all possible results from computing all the different possible ways to group numbers and operators. You may return the answer in any order.



Example 1:

Input: expression = "2-1-1"
Output: [0,2]
Explanation:
((2-1)-1) = 0
(2-(1-1)) = 2
Example 2:

Input: expression = "2*3-4*5"
Output: [-34,-14,-10,-10,10]
Explanation:
(2*(3-(4*5))) = -34
((2*3)-(4*5)) = -14
((2*(3-4))*5) = -10
(2*((3-4)*5)) = -10
(((2*3)-4)*5) = 10


Constraints:

1 <= expression.length <= 20
expression consists of digits and the operator '+', '-', and '*'.
*/

function diffWaysToCompute(expression: string): number[] {
  const map = new Map<string, number[]>();
  return dfs(expression);

  function dfs(e: string) {
    if (map.has(e)) {
      return map.get(e);
    }

    const result: number[] = [];

    for (let i = 0; i < e.length; ++i) {
      if ('+-*'.includes(e[i])) {
        for (const a of dfs(e.substring(0, i))) {
          for (const b of dfs(e.substring(i + 1))) {
            switch (e[i]) {
              case '+': {
                result.push(a + b);
                break;
              }
              case '-': {
                result.push(a - b);
                break;
              }
              case '*': {
                result.push(a * b);
                break;
              }
            }
          }
        }
      }
    }

    if (result.length === 0) {
      result.push(Number(e));
    }
    map.set(e, result);
    return result;
  }
}
