// Spiral Star Matrix

// f(7) should write:

// *******
//       *
//  **** *
//  *  * *
//  * ** *
//  *    *
//  ******


// f(12)

//  ************
//             *
//   ********* *
//   *       * *
//   * ***** * *
//   * *   * * *
//   * * * * * *
//   * * *** * *
//   * *     * *
//   * ******* *
//   *         *
//   ***********


#include <iostream>
#include <stdlib.h>
using namespace std;

void f(const int n) {
	int n = m;

	vector<vector<char> matrix(n, vector<char>(n, " "));
	fill_n(&matrix[0][0], n * n, 0);
	
	for (int i = 0, j = -1; n > 0;) {
		for (int a = n--; a > 0; a--) {
			matrix[i][++j] = "*";
		}
		for (int a = n--; a > 0; a--) {
			matrix[++i][j] = "*";
		}
		for (int a = n--; a > 0; a--) {
			matrix[i][--j] = "*";
		}
		for (int a = n--; a > 0; a--) {
			matrix[--i][j] = "*";
		}
	}

	for (int i = 0; i < m; i++) {
		for (int j = 0; j < m; j++) {
			cout << matrix[i][j];
		}
		cout << "\n";
	}
}

int main() {
    f(7);
}