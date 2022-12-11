/*
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

function diffWaysToCompute(exp: string): number[] {
  const expOutputListMap = new Map<string, number[]>();
  return diffWaysToComputeDfs(exp);

  function diffWaysToComputeDfs(exp: string): number[] {
    if (expOutputListMap.has(exp)) {
      return expOutputListMap.get(exp)!;
    }

    const result: number[] = [];
    for (let i = 0; i < exp.length; ++i) {
      if (['+', '-', '*'].find(c => c === exp[i])) {
        for (const a of diffWaysToComputeDfs(exp.substring(0, i))) {
          for (const b of diffWaysToComputeDfs(exp.substring(i + 1))) {
            switch (exp[i]) {
              case '+':
                result.push(a + b);
                break;
              case '-':
                result.push(a - b);
                break;
              case '*':
                result.push(a * b);
                break;
            }
          }
        }
      }
    }
    if (result.length === 0) {
      result.push(Number(exp));
    }
    expOutputListMap.set(exp, result);
    return result;
  }
}
