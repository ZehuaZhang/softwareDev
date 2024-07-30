/*
273. Integer to English Words

Convert a non-negative integer num to its English words representation.



Example 1:

Input: num = 123
Output: "One Hundred Twenty Three"
Example 2:

Input: num = 12345
Output: "Twelve Thousand Three Hundred Forty Five"
Example 3:

Input: num = 1234567
Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
Example 4:

Input: num = 1234567891
Output: "One Billion Two Hundred Thirty Four Million Five Hundred Sixty Seven Thousand Eight Hundred Ninety One"


Constraints:

0 <= num <= 231 - 1
*/

function numberToWords(num: number): string {
  const a = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];

  const b = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const c = ["Thousand", "Million", "Billion"];

  const h = 1000;
  const rslt: string[] = [hundred(num % h)];

  for (let i = 0; i < 3; ++i) {
    num = Math.trunc(num / h);
    if (num % h) {
      rslt.push([hundred(num % h), c[i]].join(" "));
    }
  }

  const r = rslt.filter(Boolean).reverse().join(" ");
  return r.length ? r : "Zero";

  function hundred(n: number) {
    const [x, y, z] = [Math.trunc(n / 100), n % 100, n % 10];
    return [
      x ? a[x] + " Hundred" : "",
      y < 20 ? a[y] : b[Math.trunc(y / 10)],
      y < 20 ? "" : a[z],
    ]
      .filter(Boolean)
      .join(" ");
  }
}
