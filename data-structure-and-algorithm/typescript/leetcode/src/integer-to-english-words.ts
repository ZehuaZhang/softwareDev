/*
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
  const thousandsList = ['Thousand', 'Million', 'Billion'];

  let result = toHundreds(num % 1000);
  for (let i = 0; i < 3; ++i) {
    num = Math.trunc(num / 1000);
    result =
      num % 1000 !== 0
        ? [toHundreds(num % 1000), thousandsList[i], result]
            .filter(Boolean)
            .join(' ')
        : result;
  }
  return result.length === 0 ? 'Zero' : result;
}

function toHundreds(num: number): string {
  const numsLess20List = [
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
  const tensGreaterEqual20List = [
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
  const result: string[] = Array(3).fill('');
  const a = Math.trunc(num / 100);
  const b = num % 100;
  const c = num % 10;
  result[0] = a > 0 ? `${numsLess20List[a]} Hundred` : '';
  result[1] =
    b < 20 ? numsLess20List[b] : tensGreaterEqual20List[Math.trunc(b / 10)];
  result[2] = b >= 20 ? numsLess20List[c] : '';
  return result.filter(Boolean).join(' ');
}
