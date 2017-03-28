// 227. Basic Calculator II
// Difficulty: Medium

// Implement a basic calculator to evaluate a simple expression string.

// The expression string contains only non-negative integers, +, -, *, / operators and empty spaces .
// The integer division should truncate toward zero.

// You may assume that the given expression is always valid.

// Some examples:
// "3+2*2" = 7
// " 3/2 " = 1
// " 3+5 / 2 " = 5

// Time:  O(n)
// Space: O(n)

// Support +, -, *, /, (, ).

public class Solution {
    int calculate(string s) {
        stack<int64_t> operands;
        stack<char> operators;
        int d = 0;
        for (int i = 0; i < s.length(); ++i) {
            if (isdigit(s[i])) {
                d = d * 10 + s[i] - '0';
                if (i == s.length() - 1 || !isdigit(s[i + 1])) {
                    operands.push(d);
                    d = 0;
                }
            } else if (s[i] == '(' || isOperator(s[i])) {
                while (!operators.empty() && precedence(s[i]) <= precedence(operators.top())) {
                    compute(operands, operators);
                }
                operators.emplace(s[i]);
            } else if (s[i] == ')') {
                // operators at least one element, i.e. ')'.
                while (operators.top() != '(') {
                    compute(operands, operators);
                }
                operators.pop();
            }
        }
        while (!operators.empty()) {
            compute(operands, operators);
        }
        return operands.top();
    }
    public int calculate(String s) {
        Stack<Integer> operands = new Stack<>();
        Stack<Character> operators = new Stack<>();
        int i = 0; // integer can have more than one chars, so, use while instead of for
        while (i < s.length()) {
            if (s.charAt(i) != ' ') {
                if (Character.isDigit(s.charAt(i))) {
                    int start = i;
                    ++i;
                    while (i < s.length() && Character.isDigit(s.charAt(i))) ++i;
                    int num = Integer.parseInt(s.substring(start, i));
                    stkNum.push(num);
                } else {
                    if (stkOp.isEmpty()) {
                        stkOp.push(s.charAt(i));
                    } else {
                        while (!stkOp.isEmpty() && !higher(s.charAt(i), stkOp.peek())) {
                            calculate(stkNum, stkOp);
                        }
                        stkOp.push(s.charAt(i));
                    }
                    ++i;
                }
            } else {
                ++i;
            }
        }
        while (!stkOp.isEmpty()) calculate(stkNum, stkOp);
        return stkNum.pop();
    }
    private boolean higher(char high, char low) {
        // high and low will be operators.
        if (high == '+' || high == '-') {
            return false;
        } else {
            if (low == '*' || low == '/') return false;
            else return true;
        }
    }
    private void calculate(Stack<Integer> stkNum, Stack<Character> stkOp) {
        char op = stkOp.pop();
        int num2 = stkNum.pop();
        int num1 = stkNum.pop();
        int num = 0;
        switch (op) {
            case '+':
                num = num1 + num2;
                break;
            case '-':
                num = num1 - num2;
                break;
            case '*':
                num = num1 * num2;
                break;
            case '/':
                num = num1 / num2;
                break;
        }
        stkNum.push(num);
    }

    
    bool isOperator(const char op) {
        return string("+-*/").find(op) != string::npos;
    }
    
    int precedence(const char op) {
        switch(op) {
        case '+' : return 1;
        case '-' : return 1;
        case '*' : return 2;
        case '/' : return 2;
        case '(' : return 3;
        }
        return 0;
    }

    void compute(stack<int64_t>& operands, stack<char>& operators) {
        const int64_t y = operands.top(); operands.pop();
        const int64_t x = operands.top(); operands.pop();
        const char op = operators.top(); operators.pop();

        switch (op) {
        case '+' : operands.emplace(x + y); break;
        case '-' : operands.emplace(x - y); break;
        case '*' : operands.emplace(x * y); break;
        case '/' : operands.emplace(x / y); break;
        }
    }
}
