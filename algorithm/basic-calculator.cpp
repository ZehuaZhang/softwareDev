224. Basic Calculator
Difficulty: Hard

Implement a basic calculator to evaluate a simple expression string.

The expression string may contain open ( and closing parentheses ), the plus + or minus sign -, non-negative integers and empty spaces .

You may assume that the given expression is always valid.

Some examples:
"1 + 1" = 2
" 2-1 + 2 " = 3
"(1+(4+5+2)-3)+(6+8)" = 23

// Time:  O(n)
// Space: O(n)

// Support +, -, *, /, (, ).
class Solution {
public:
    int calculate(string s) {
        stack<int64_t> operands;
        stack<char> operators;
        int64_t operand = 0;
        for (int i = 0; i < s.length(); ++i) {
            if (isdigit(s[i])) {
                operand = operand * 10 + s[i] - '0';
                if (i == s.length() - 1 || !isdigit(s[i + 1])) {
                    operands.push(operand);
                    operand = 0;
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
};