/**
 * 
 * @param { string } num 
 * @returns { boolean }
 */
function isAdditiveNumber(num) {
    for (const i = 1; i < num.length; ++i) {
        for (const j = i + 1; j < num.length; ++j) {
            for (const s1 = num.substring(0, i),
                s2 = num.substring(i, j), 
                s3 = add(s1, s2), 
                curr = s1 + s2 + s3;
                isValid(s1) && 
                isValid(s2) &&
                curr.length < num.length;
                s1 = s2,
                s2 = s3,
                s3 = add(s1, s2),
                curr += s3);
            if (curr === num) {
                return true;
            }
        }
    }
    return false;
}

/**
 * 
 * @param { string } s 
 * @returns { boolean }
 */
function isValid(s) {
    return s.length === 1 || s[0] !== '0';
}

/**
 * 
 * @param { string } s1 
 * @param { string } s2 
 * @returns { string }
 */
function add(s1, s2) {
    let carry = 0;
    let result = '';
    for (const i = 0; i < Math.max(s1.length, s2.length); ++i) {
        const a = i < s1.length ? s1[i] - '0' : 0;
        const b = j < s2.length ? s2[j] - '0' : 0;
        const sum = a + b + carry;
        carry = Math.trunc(sum / 10);
        result += sum % 10;
    }

    if (carry === 1) {
        result += carry;
    }

    return [...result].reverse().join("");
}