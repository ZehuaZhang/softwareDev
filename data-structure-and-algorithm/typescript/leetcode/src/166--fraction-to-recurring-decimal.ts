/*
166. Fraction to Recurring Decimal

Given two integers representing the numerator and denominator of a fraction, return the fraction in string format.

If the fractional part is repeating, enclose the repeating part in parentheses.

If multiple answers are possible, return any of them.

It is guaranteed that the length of the answer string is less than 104 for all the given inputs.

 

Example 1:

Input: numerator = 1, denominator = 2
Output: "0.5"
Example 2:

Input: numerator = 2, denominator = 1
Output: "2"
Example 3:

Input: numerator = 4, denominator = 333
Output: "0.(012)"
 

Constraints:

-231 <= numerator, denominator <= 231 - 1
denominator != 0
*/

function fractionToDecimal(numerator: number, denominator: number): string {
  const result: string[] = [];
  if ((numerator ^ denominator) >> 31 && numerator !== 0) {
    result.push('-');
  }

  let a = Math.abs(numerator);
  const b = Math.abs(denominator);
  result.push(String(Math.trunc(a / b)));

  a %= b;
  if (a > 0) {
    result.push('.');
  }

  const map = new Map<number, number>();
  while (a && !map.has(a)) {
    map.set(a, result.length);
    a *= 10;
    result.push(String(Math.trunc(a / b)));
    a %= b;
  }

  if (map.has(a)) {
    result.splice(map.get(a), 0, '(');
    result.push(')');
  }

  return result.join('');
}
