// 269. Alien Dictionary
// Difficulty : Hard 

// There is a new alien language which uses the latin alphabet. 
// However, the order among letters are unknown to you. You receive a list of words from the dictionary,
// where words are sorted lexicographically by the rules of this new language. 
// Derive the order of letters in this language.

// For example,
// Given the following words in dictionary,
// [
//   "wrt",
//   "wrf",
//   "er",
//   "ett",
//   "rftt"
// ]
 

// The correct order is: "wertf".

// Note:
// You may assume all letters are in lowercase.
// If the order is invalid, return an empty string.
// There may be multiple valid order of letters, return any one of them is fine.
// after getting the precedence order of the characters, the problem becomes the same as the classic topological sorting problem
// and then is similar to Course Schedule, and Course Schedule II. We can use a dependent list, or dependent set, and 
// an indegree count array/map to generate a topological sorting.

// Time:  O(n)
// Space: O(|V|+|E|) = O(26 + 26^2) = O(1)

public class Solution {
    public String alienOrder(String[] words) {
        Map<Character, Set<Character>> dependList = new HashMap<>();
        int[] inDegree = new int[256];
        for (int i = 0; i < words.length; ++i) {
            for (int j = 0; j < words[i].length(); ++j) {
                if (!dependList.containsKey(words[i].charAt(j))) {
                    dependList.put(words[i].charAt(j), new HashSet<>());
                }
            }
        }
        for (int i = 1; i < words.length; ++i) {
            String prev = words[i - 1], cur = words[i];
            int j = 0;
            while (j < prev.length() && j < cur.length() && prev.charAt(j) == cur.charAt(j)) {
                ++j;
            }
            if (j != prev.length() && j != cur.length() &&
                !dependList.get(prev.charAt(j)).contains(cur.charAt(j))) {
                    dependList.get(prev.charAt(j)).add(cur.charAt(j));
                    ++inDegree[cur.charAt(j)];
                }
            }
        }
        Queue<Character> q = new LinkedList<>(); // use a queue to do Breadth-First Search
        for (char c : dependList.keySet()) {
            if (inDegree[c] == 0) {
                q.add(c);
            }
        }
        StringBuilder sb = new StringBuilder();
        while (!q.isEmpty()) {
            char c = q.remove();
            sb.append(c);
            for (char dependent : dependList.get(c)) {
                if (--inDegreeMap[dependent] == 0) {
                    q.add(dependent);
                }
            }
        }
        if (dependList.size() == sb.length()) {
            return new String(sb);
        }
        return "";
    }
}
