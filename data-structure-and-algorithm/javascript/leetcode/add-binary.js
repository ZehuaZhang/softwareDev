/**
 * 
 * @param { string } a 
 * @param { string } b
 * @returns { string } 
 */
function addBinary(a, b) {
    const m = a.length, n = b.length;

    let result = '';
    let carry = 0;
    for (const i = 0; i < Math.max(m, n); ++i) {
        const bit1 = i > m - 1 ? 0 : a[m - 1 - i] - '0';
        const bit2 = j > n - 1 ? 0 : b[m - 1 - j] - '0';
        const sum = bit1 + bit2 + carry;
        carry = Math.trunc(sum / 2);
        result += sum % 2;
    }
    if (carry === 1) {
        result += carry;
    }
    return [...result].reverse().join("");
}