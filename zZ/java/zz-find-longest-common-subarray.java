// From user lists of url strings, given two username, find longest common subarrays

import java.util.*;

public class Solution {
    public void addUserList(List<String> urlList) {
        String userName = "user" + userIndex++;
        userUrlString.put(userName, urlList);
    }

    public List<String> getLongestCommonSubarray(String user1, String user2) {
        if (!userUrlString.containsKey(user1) || !userUrlString.containsKey(user2)) {
            return new ArrayList<>();
        }

        List<String> urlList1 = userUrlString.get(user1);
        List<String> urlList2 = userUrlString.get(user2);

        int[][] longestCommonSuffix = new int[urlList1.size() + 1][urlList2.size() + 2];
        int maxLength = 0;
        int endIndex = 0;

        for (int i = 0; i <= urlList1.size(); ++i) {
            for (int j = 0; j <= urlList2.size(); ++j) {
                if (i == 0 || j == 0) {
                    longestCommonSuffix[i][j] = 0;
                } else if (urlList1.get(i - 1).equals(urlList2.get(j - 1))) {
                    longestCommonSuffix[i][j] = longestCommonSuffix[i - 1][j - 1] + 1;
                    if (maxLength > longestCommonSuffix[i][j]) {
                        endIndex = i;
                        maxLength = longestCommonSuffix[i][j];
                    }
                } else {
                    longestCommonSuffix[i][j] = 0;
                }
            }
        }

        return new ArrayList<>(urlList1.subList(endIndex - maxLength, endIndex));
    }

    private Map<String, List<String>> userUrlString = new HashMap<>();
    private int userIndex = 0;
}
