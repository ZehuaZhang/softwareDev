/*
Spiral Star Matrix

f(7) should write:

*******
      *
 **** *
 *  * *
 * ** *
 *    *
 ******

f(12)

 ************
            *
  ********* *
  *       * *
  * ***** * *
  * *   * * *
  * * * * * *
  * * *** * *
  * *     * *
  * ******* *
  *         *
  ***********
  */

function spiralMatrix(loops: number): void {
  const length = loops;
  const matrix = [...Array(loops)].map(() => Array(loops).fill(' '));

  for (let i = 0, j = -1; loops > 0; ) {
    for (let a = loops--; a > 0; a--) {
      matrix[i][++j] = '*';
    }
    for (let a = loops--; a > 0; a--) {
      matrix[++i][j] = '*';
    }
    for (let a = loops--; a > 0; a--) {
      matrix[i][--j] = '*';
    }
    for (let a = loops--; a > 0; a--) {
      matrix[--i][j] = '*';
    }
  }

  for (let i = 0; i < length; ++i) {
    console.log(...matrix[i]);
  }
}

spiralMatrix(12);
