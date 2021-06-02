/**
 * Restore IP Addresses
 * 
 * Given a string containing only digits, restore it by returning all possible valid IP address combinations.
 * 
 * Example:
 * 
 * Input: "25525511135"
 * Output: ["255.255.11.135", "255.255.111.35"]
 */

import java.util.ArrayList;
import java.util.List;

public class Solution {
    public List<String> restoreIpAddresses(String s) {
        List<String> result = new ArrayList<>();
        restoreIpAddressesHelper("", 4, 0, s, result);
        return result;
    }

    private void restoreIpAddressesHelper(String path, int remainingStep, int start, String s, List<String> result) {
        if (s.length() - start > 3 * remainingStep || s.length() - start < remainingStep) {
            return;
        }
        
        if (start == s.length() && remainingStep == 0) {
            result.add(path);
        } else {

            for (int i = start; i < Math.min(start + 3, s.length()); ++i) {
                String substring = s.substring(start, i + 1);
                
                int value = Integer.parseInt(substring);
                if (value < 0 || value > 255 || (i - start + 1) != String.valueOf(value).length()) {
                    break;
                }
                String nextPath = remainingStep == 4 ? substring : (path + "." + substring);
                restoreIpAddressesHelper(nextPath, remainingStep - 1, i + 1, s, result);
            }
        }
    }
}
