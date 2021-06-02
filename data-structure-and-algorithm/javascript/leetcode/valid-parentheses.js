// 20. Valid Parentheses

// Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

// An input string is valid if:

// Open brackets must be closed by the same type of brackets.
// Open brackets must be closed in the correct order.
// Note that an empty string is also considered valid.

// Example 1:

// Input: "()"
// Output: true
// Example 2:

// Input: "()[]{}"
// Output: true
// Example 3:

// Input: "(]"
// Output: false
// Example 4:

// Input: "([)]"
// Output: false
// Example 5:

// Input: "{[]}"
// Output: true

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
    if (!isString(s)) {
        throw "invalid input string"
    }
    
    const rightToLeftParantheseMap = new Map([
        [')', '('],
        ['}', '{'],
        [']', '[']
    ])
    
    const leftParentheseList = "({["
    
    const stack = []
    for (const character of s) {
        if (leftParentheseList.includes(character)) {
            stack.push(character)
        } else if (rightToLeftParantheseMap.get(character) !== stack[stack.length - 1]) {
            return false
        } else {
            stack.splice(stack.length - 1, 1)
        }
    }
        
    return stack.length === 0
};

function isString(item) {
    return typeof item === 'string'
}