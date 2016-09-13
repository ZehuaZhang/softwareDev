72. Edit Distance
Difficulty: Hard

Given two words word1 and word2, find the minimum number of steps required to convert word1 to word2. (each operation is counted as 1 step.)

You have the following 3 operations permitted on a word:

a) Insert a character
b) Delete a character
c) Replace a character

class Solution {
public:
    int minDistance(string word1, string word2) {
        const size_t m = word1.size();
		const size_t n = word2.size();

		int f[m + 1][n + 1];
		for (size_t i = 0; i <= m; i++) {
			f[i][0] = i;
		}
		for (size_t j = 0; j <= n; j++) {
			f[0][j] = j;
		}
		for (size_t i = 1; i <= m; i++) {
			for (size_t j = 1; j <= n; j++) {
				if (word1[i - 1] == word2[j - 1]) {
					f[i][j] = f[i - 1][j - 1];
				} else {
					f[i][j] = 1 + min(f[i - 1][j - 1], min(f[i - 1][j], f[i][j - 1]));
				}
			}
		}
		return f[m][n];
    }
};