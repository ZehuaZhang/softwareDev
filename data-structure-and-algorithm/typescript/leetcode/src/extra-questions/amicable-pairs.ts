// Find Amacible Pairs.

// The pair of numbers 220 and 284 have the curious property that each "contains" the other.
// In what way?  In the sense that the sum of the proper positive divisors of each, sum to the other.
// For 220	1+2+4+5+10+11+20+22+44+55+110 = 284
// For 284	1+2+4+71+142 = 220
// Such pairs of numbers are called amicable numbers
// (amicable means friendly--but there is a different set of number actually called friendly number.).
// Find all pairs of amacible numbers, within 1 to n

function amaciblePair(range: number): [number, number][] {
  const result: [number, number][] = [];
  const sumOfDivList: number[] = Array(range + 1).fill(1);
  for (let num = 1; num <= range; ++num) {
    let sum = sumOfDivList[num];
    for (let div = 2; div <= Math.sqrt(num); ++div) {
      if (num % div === 0) {
        sum += div;
        if (div !== Math.trunc(num / div)) {
          sum += Math.trunc(num / div);
        }
      }
    }
    sumOfDivList[num] = sum;
  }
  const visited = new Set<number>();
  for (let num = 2; num <= range; ++num) {
    const sum = sumOfDivList[num];
    if (
      num !== sum &&
      sum <= range &&
      num === sumOfDivList[sum] &&
      !visited.has(num) &&
      !visited.has(sum)
    ) {
      result.push([num, sum]);
      visited.add(num);
      visited.add(sum);
    }
  }
  return result;
}

console.log(amaciblePair(100005));
