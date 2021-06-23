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
    function calculateDFS(s) {
        if (i === s.length) {
            return 0;
        }
        const sum = [];
        let op = '+';
        let num = 0;
        for (; i < s.length;) {
            const char = s[i++];
            if (char >= '0' && char <= '9') {
                num = num * 10 + (char - '0');
            }
            if (char === '(') {
                num = calculateDFS(s);
            }
            if (i === s.length || ['+', '-', '*', '/', ')'].find(c => c === char)) {
                switch (op) {
                    case '+': sum.push(num); break;
                    case '-': sum.push(-num); break;
                    case '*': sum.push(sum.pop() * num); break;
                    case '/': sum.push(Math.trunc(sum.pop() / num)); break;
                }
                op = char;
                num = 0;
                if (op === ')') {
                    break;
                }
            }
        }
        return sum.reduce((a, b) => a + b, 0);
    }

    let i = 0;
    return calculateDFS(s);
}

function calculateIterative(s) {
    const [operands, operators] = [[], []];
    let num = 0;
    for (let i = 0; i < s.length; ++i) {
        const char = s[i];
        if (isDigit(char)) {
            num = num * 10 + (char - '0');
            if (i === s.length - 1 || !isDigit(s[i + 1])) {
                operands.push(num);
                num = 0;
            }
        } else if (isOp(char)) {
            while (operators.length !== 0 && getPrecendence(char) <= getPrecendence(operators[operators.length - 1])) {
                compute(operands, operators);
            }
            operators.push(char);
        } else if (char === '(') {
            operators.push(char);
        } else if (char === ')') {
            while (operators[operators.length - 1] !== '(') {
                compute(operands, operators);
            }
            operators.pop();
        }
    }
    while (operators.length !== 0) {
        compute(operands, operators);
    }
    return operands.pop();
}

function isDigit(char) {
    return char >= '0' && char <= '9';
}

function isOp(char) {
    return Boolean(['+', '-', '*', '/'].find(c => c === char));
}

function getPrecendence(char) {
    switch(char) {
        case '+': return 1;
        case '-': return 1;
        case '*': return 2;
        case '/': return 2;
    }
    return 0;
}

function compute(operands, operators) {
    const x = operands.pop();
    const y = operands.pop();
    const op = operators.pop();

    switch(op) {
        case '+': operands.push(x + y); break;
        case '-': operands.push(x - y); break;
        case '*': operands.push(x * y); break;
        case '/': operands.push(x / y); break;
    }
}

function calculateDFS(s) {
    let result = 0, curr = 0, num = 0;
    let op = '+';
    for (let i = 0; i < s.length; ++i) {
        const char = s[i];
        if (char >= '0' && char <= '9') {
            num = num * 10 + (char - '0');
        } else if (char === '(') {
            num = calculateDFS(s.substring(j + 1));
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
        if (char === ')') {
            return result;
        }
    }
    return result;
}