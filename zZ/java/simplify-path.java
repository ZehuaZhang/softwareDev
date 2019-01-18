/**
 * Simplify Path
 * 
 * Given an absolute path for a file (Unix-style), simplify it.
 * 
 * For example, path = "/home/", => "/home" path = "/a/./b/../../c/", => "/c"
 * 
 * Corner Cases: Did you consider the case where path = "/../"? In this case,
 * you should return "/". Another corner case is the path might contain multiple
 * slashes '/' together, such as "/home//foo/". In this case, you should ignore
 * redundant slashes and return "/home/foo".
 */

import java.util.ArrayList;
import java.util.Stack;

public class Solution {
    public String simplifyPath(String path) {
        if (path == null) {
            throw new NullPointerException();
        }

        String[] pathList = path.split("/");
        Stack<String> pathStack = new Stack<>();
        for (String subpath : pathList) {
            if (!pathStack.isEmpty() && subpath.equals("..")) {
                pathStack.pop();
            } else if (!subpath.equals(".") && !subpath.equals("") && !subpath.equals("..")) {
                pathStack.push(subpath);
            }
        }

        List<String> simplifiedPathList = new ArrayList<String>(pathStack);
        return "/" + String.join("/", simplifiedPathList);
    }
}
