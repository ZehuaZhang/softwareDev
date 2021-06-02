// 65. Valid Number
// Difficulty: Hard

// Validate if a given string is numeric.

// Some examples:
// "0" => true
// " 0.1 " => true
// "abc" => false
// "1 a" => false
// "2e10" => true
// Note: It is intended for the problem statement to be ambiguous. 
// You should gather all requirements up front before implementing one.

// Update (2015-02-10):
// The signature of the C++ function had been updated. 
// If you still see your function signature accepts a const char * argument,
// please click the reload button  to reset your code definition

// Time:  O(n)
// Space: O(1)

// automata: http://images.cnitblog.com/i/627993/201405/012016243309923.png
class Solution {
public:
  bool isNumber(string s) {
    enum InputType {
      INVALID,    // 0
      SPACE,      // 1
      SIGN,       // 2
      DIGIT,      // 3
      DOT,        // 4
      EXPONENT,   // 5
    };
    int next[][6] = {    // next state, with current state and input
    // INVALID  SPACE  SIGN  DIGIT  DOT  EXPONENT
      -1,       0,     3,    1,     2,  -1,     // empty, or has only space inputs
      -1,       8,    -1,    1,     4,   5,     // previous digit input
      -1,      -1,    -1,    4,    -1,  -1,     // previous dot input, no digit before dot
      -1,      -1,    -1,    1,     2,  -1,     // previous sign input
      -1,       8,    -1,    4,    -1,   5,     // previous dot input, has digit before dot
      -1,      -1,     6,    7,    -1,  -1,     // previous exponent input
      -1,      -1,    -1,    7,    -1,  -1,     // previous input sign after exponent
      -1,       8,    -1,    7,    -1,  -1,     // previous input digit after exponent
      -1,       8,    -1,   -1,    -1,  -1,     // previous input space after valid number
    };

  // summary scenario
  // 1) space before / after valid number, 2 cases
  // 2) digit / sign / exponent, 3 cases
  // 3) with / without digit before dot, 2 cases
  // 4) sign / digit after exponent, 2 cases

    int state = 0;
    for (auto c: s) {
      InputType inputType = INVALID;
      if (isspace(c)) {
        inputType = SPACE;
      } else if (c == '+' || c == '-') {
        inputType = SIGN;
      } else if (isdigit(c)) {
        inputType = DIGIT;
      } else if (c == '.') {
        inputType = DOT;
      } else if (c == 'e' || c == 'E') {
        inputType = EXPONENT;
      }
      // Get next state from current state and input symbol
      state = next[state][inputType];

      // Invalid input
      if (state == -1) {
        return false;
      }
    }
    // If the current state belongs to one of the accepting (final) states,
    // then the number is valid
    return state == 1 || state == 4 || state == 7 || state == 8;
  }
};