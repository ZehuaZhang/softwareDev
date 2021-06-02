
/**
 * first line must be no indent
 * following lines after : must be indent further
 * comment line doesn't have follow any rules, that starts with "#"
 * 
 * return 0 if valid, otherwise return invalid line number
 */

import java.util.*;

public class Solution {
    public int validatePythonIndentation(List<String> lines) {
        Stack<Integer> stack = new Stack<>();
        
        int prevIndex = -1;
        for (int i = 0; i < lines.size(); ++i) {
            String line = lines.get(i);
            int level = getLeftSpace(line);

            // first unit of the line, or first non-whitespace unit of the line
            if (level < line.length() && line.charAt(level) == '#') {
                continue;
            }

            if (prevIndex == -1 && level != 0) {
                return i + 1;
            }

            if (prevIndex != -1 && lines.get(prevIndex).trim().charAt(lines.get(prevIndex).trim().length() - 1) == ':') {

                // question: does it have to be 1 unit indent further, or any >= 1 
                if (level <= stack.peek()) {
                    return i + 1;
                }
            } else {
                while (!stack.isEmpty() && level < stack.peek()) {
                    stack.pop();
                }

                if (!stack.isEmpty() && level != stack.peek()) {
                    return i + 1;
                }
            }

            prevIndex = i;
            stack.push(level);
        }
        
        return 0;
    }

    private int getLeftSpace(String word) {
        int count = 0;

        for (char c : word.toCharArray()) {
            if (!Character.isWhitespace(c)) {
                return count;
            }

            ++count;
        }

        return count;
    }
}
