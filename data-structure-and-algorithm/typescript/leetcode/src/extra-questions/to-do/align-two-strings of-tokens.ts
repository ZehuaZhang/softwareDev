/*
Align Two Strings of Tokens
*/

class Token {
  word: string;
  start: number;
  end: number;
  constructor(word: string, start: number, end: number) {
    this.word = word;
    this.start = start;
    this.end = end;
  }
}

function alignTwoStringTokens(list1: Token[], list2: Token[]): string[][][] {
  const compare = ({start: start1}: Token, {start: start2}: Token) => {
    return start1 - start2;
  };
  list1.sort(compare);
  list2.sort(compare);
  const [size1, size2] = [list1.length, list2.length];

  const result: string[][][] = [];
  let i = 0,
    j = 0;
  for (; i < size1 || j < size2; ) {
    if (list1[i].start < list2[j].start) {
      result.push([[list1[i++].word]]);
    } else if (list1[i].start > list2[j].start) {
      result.push([[list2[j++].word]]);
    } else {
      const i0 = i,
        j0 = j;
      while (i < size1 && j < size2 && list1[i].end !== list2[j].end) {
        if (list1[i].end < list2[j].end) {
          if (i + 1 === size1 || list1[i + 1].start > list1[i].end + 1) {
            (i = size1), (j = size2);
            break;
          } else {
            ++i;
          }
        } else if (list1[i].end > list2[j].end) {
          if (j + 1 === size2 || list2[j + 1].start > list2[j].end + 1) {
            (i = size1), (j = size2);
            break;
          } else {
            ++j;
          }
        }
      }

      const array1: string[] = [];
      const array2: string[] = [];
      for (let I = i0; I < i; ++I) {
        array1.push(list1[I++].word);
      }
      for (let J = j0; J < j; ++J) {
        array2.push(list2[J++].word);
      }
      if (i === size1 || j === size2 || list1[i].end !== list2[j].end) {
        result.push([array1]);
        result.push([array2]);
      } else {
        result.push([array1, array2]);
      }
    }
  }
  return result;
}
