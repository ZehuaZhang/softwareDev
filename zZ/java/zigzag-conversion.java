/**
 * ZigZag Converesion
 *  
 * The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)
 * 
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 * And then read line by line: "PAHNAPLSIIGYIR"
 * 
 *  
 * 
 * Write the code that will take a string and make this conversion given a number of rows:
 * 
 * string convert(string text, int nRows);
 * convert("PAYPALISHIRING", 3) should return "PAHNAPLSIIGYIR".
 */

public class Solution {
    public String convert(String s, int numRows) {
        if (numRows == 1) {
            return new String(s);
        }

        StringBuilder stringBuilder = new StringBuilder();

        // first row
        for (int i = 0; i < s.length(); i = i + 2 * numRows - 2) {
            stringBuilder.append(s.charAt(i));
        }

        // second row to last but no least row
        for (int j = 1; j <= numRows - 2; ++j) {
            for (int i = j; i < s.length(); i = i + 2 * numRows - 2) {
                stringBuilder.append(s.charAt(i));

                if (i + 2 * (numRows - j - 1) < s.length()) {
                    stringBuilder.append(s.charAt(i + 2 * (numRows - j - 1)));
                }
            }
        }

        // last row
        for (int i = numRows - 1; i < s.length(); i = i + 2 * numRows - 2) {
            stringBuilder.append(s.charAt(i));
        }

        return new String(stringBuilder);
    }
}
