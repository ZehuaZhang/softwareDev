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
    '',
    'One',
    'Two',
    'Three',
    'Four',
    'Five',
    'Six',
    'Seven',
    'Eight',
    'Nine',
    'Ten',
    'Eleven',
    'Twelve',
    'Thirteen',
    'Fourteen',
    'Fifteen',
    'Sixteen',
    'Seventeen',
    'Eighteen',
    'Nineteen',
  ];
  const b = [
    '',
    '',
    'Twenty',
    'Thirty',
    'Forty',
    'Fifty',
    'Sixty',
    'Seventy',
    'Eighty',
    'Ninety',
  ];
  const c = ['Thousand', 'Million', 'Billion'];

  const h = 1000;
  const rslt: string[] = [hundred(num % h)];

  for (let i = 0; i < 3; ++i) {
    num = Math.trunc(num / h);
    const d = num % h;
    if (d) {
      const seg = [hundred(d), c[i]].join(' ');
      rslt.push(seg);
    }
  }

  const r = rslt.filter(Boolean).reverse().join(' ');
  return r.length ? r : 'Zero';

  function hundred(num) {
    const v1 = Math.trunc(num / 100),
      v2 = num % 100,
      v3 = num % 10;
    const v: string[] = [
      v1 > 0 ? `${a[v1]} Hundred` : '',
      v2 < 20 ? a[v2] : b[Math.trunc(v2 / 10)],
      v2 >= 20 ? a[v3] : '',
    ];
    return v.filter(Boolean).join(' ');
  }
}
