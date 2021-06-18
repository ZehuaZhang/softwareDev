/**
Implement a basic calculator to evaluate a simple expression string.

The expression string may contain open ( and closing parentheses ), the plus + or minus sign -, non-negative integers and empty spaces .

The expression string contains only non-negative integers, +, -, *, / operators , open ( and closing parentheses ) and empty spaces . The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate results will be in the range of [-2147483648, 2147483647].

Some examples:

"1 + 1" = 2
" 6-4 / 2 " = 4
"2*(5+5*2)/3+(6/2+8)" = 21
"(2+6* 3+5- (3*14/7+2)*5)+3"=-12
 

Note: Do not use the eval built-in library function.
*/

function calculate(s) {
    let result = 0, curr = 0, num = 0;
    let op = '+';
    for (let i = 0; i < n; ++i) {
        let char = s[i];
        if (char >= '0' && char <= '9') {
            num = num * 10 + (char - '0');
        } else if (char === '(') {
            let j = i;
            let count = 0;
            for (; i < s.length; ++i) {
                if (s[i] === '(') {
                    ++count;
                } else if (s[i] === '}') {
                    --count;
                }
                if (count === 0) {
                    break;
                }
            }
            num = calculate(s.substring(j + 1, i - 1));
        }
        if (['+','-','*','/'].find(c => c === char) || i === s.length - 1) {
            switch (op) {
                case '+': curr += num; break;
                case '-': curr -= num; break;
                case '*': curr *= num; break;
                case '/': curr = Math.trunc(curr / num); break;
            }
            if (['+','-'].find(c => c === char) || i === s.length - 1) {
                result += curr;
                curr = 0;
            }
            op = char;
            num = 0;
        }
    }
    return result;
}