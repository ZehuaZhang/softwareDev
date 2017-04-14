// 282. Expression Add Operators
// Difficulty: Hard

// Given a string that contains only digits 0-9 and a target value, 
// return all possibilities to add binary operators (not unary) +, -, or * 
// between the digits so they evaluate to the target value.

// Examples: 
// "123", 6 -> ["1+2+3", "1*2*3"] 
// "232", 8 -> ["2*3+2", "2+3*2"]
// "105", 5 -> ["1*0+5","10-5"]
// "00", 0 -> ["0+0", "0-0", "0*0"]
// "3456237490", 9191 -> []

// Time:  O(4^n)
// Space: O(n)

class Solution {
public:
  vector<string> addOperators(string num, int target) {
    vector<string> result;
    vector<string> expr;
    int val = 0;
    string valStr;
    for (int i = 0; i < num.length(); ++i) {
      val = val * 10 + num[i] - '0';
      valStr.push_back(num[i]);
      // Avoid overflow and "00...".
      if (to_string(val) != valStr) {
        break;
      }
      expr.emplace_back(valStr);
      addOperatorsDFS(num, target, i + 1, 0, val, expr, result);
      expr.pop_back();
    }
    return result;
  }

  void addOperatorsDFS(const string& num, const int& target, const int& pos,
   const int& operand1, const int& operand2, vector<string>& expr, vector<string>& result) {
    if (pos == num.length() && operand1 + operand2 == target) {
      result.emplace_back(join(expr));
    } else {
      int val = 0;
      string valStr;
      for (int i = pos; i < num.length(); ++i) {
        val = val * 10 + num[i] - '0';
        valStr.push_back(num[i]);
        // Avoid overflow and "00...".
        if (to_string(val) != valStr) {
          break;
        }
        expr.emplace_back("+" + valStr);
        addOperatorsDFS(num, target, i + 1, operand1 + operand2, val, expr, result);
        expr.pop_back();

        expr.emplace_back("-" + valStr);
        addOperatorsDFS(num, target, i + 1, operand1 + operand2, -val, expr, result);
        expr.pop_back();
        
        expr.emplace_back("*" + valStr);
        addOperatorsDFS(num, target, i + 1, operand1, operand2 * val, expr, result);
        expr.pop_back();
      }
    }
  }

  string join(const vector<string>& expr) {
    ostringstream stream;
    copy(expr.cbegin(), expr.cend(), ostream_iterator<string>(stream));
    return stream.str();
  }
};
