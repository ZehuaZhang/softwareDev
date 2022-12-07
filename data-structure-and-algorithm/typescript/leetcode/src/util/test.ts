import {printSegmentLine, stringify} from './string';
import {isEqual} from './object';

type input = any;
type inputList = input[];
type inputCollection = inputList[];
type expectedResult = any;
type expectedResultList = expectedResult[];

function stringifyInputList(list: any[]): string {
  return list.map(element => stringify(element)).join(', ');
}

function stringifyResult(result: any): string {
  return stringify(result);
}

export function runTestCaseList(
  inputCollection: inputCollection,
  expectedList: expectedResultList,
  handler: Function
): void {
  let passCount = 0;
  let failCount = 0;
  printSegmentLine();
  inputCollection.forEach((inputList: inputList, index: number) => {
    try {
      console.log(`Test case #${index + 1}:`);
      console.log(`\tInputs: ${stringifyInputList(inputList)}`);

      const expected = expectedList[index];
      console.log(`\tExpected: ${stringifyResult(expected)}`);

      const result = handler(...inputList);
      console.log(`\tActual: ${stringifyResult(result)}`);

      if (isEqual(expected, result)) {
        ++passCount;
        console.log('\tPassed');
      } else {
        ++failCount;
        console.log('\tFailed');
      }
    } catch (error) {
      ++failCount;
      console.error(`\tError: ${error}`);
    }
    printSegmentLine();
  });
  if (passCount === inputCollection.length) {
    console.log('All tests passed');
  } else {
    console.log(`Tests passed: ${passCount}, failed: ${failCount}`);
  }
  printSegmentLine();
}
