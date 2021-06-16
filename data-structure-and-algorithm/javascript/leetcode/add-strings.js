/**
 * 
 * @param { string } num1 
 * @param { string } num2 
 * @returns { string }
 */
function addStrings(num1, num2) {
    let result = '';
    let carry = 0;
    const m = num1.length, n = num2.length;
    for (const i = 0; i < Math.max(m, n); ++i) {
        const a = i < m ? num1[m - 1 - i] - '0': 0;
        const b = i < n ? num2[n - 1 - i] - '0': 0;
        const sum = a + b + carry;
        carry = Math.trunc(sum / 10);
        result += sum % 10;
    }

    if (carry === 1) {
        result += carry;
    }

    return [...result].reverse().join("");
}