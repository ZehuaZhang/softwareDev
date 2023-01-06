/*
 * Create a markdown parser which intakes and parses (to start)
 * the following strings:
 *
 * test cases:
 * "This word is *bold*."
 *   -> This word is <b>bold</b>.
 * "This word is _italics_."
 *   -> This word is <em>italics</em>.
 * "This word is _*nested*_."
 *   -> This word is <em><b>nested</b></em>.
————————————————————————————————————————————————
 * "This is a *bold section with _italics_ sometimes and _here_* word and this is a _italicized_ word."
 *   -> This is a <b>bold section with <em>italics</em> sometimes and <em>here</em></b> word and this is a <em>italicized</em> word.
————————————————————————————————————————————————
 * "This is a [link|'http://oracle.com']."
 *   -> This is a <a href='http://oracle.com'>link</a>.
 * "This is a [*bold link* | 'http://oracle.com']."
 *   -> This is a <a href='http://oracle.com'><b>bold link</b></a>.
 * "This is a [super long link text | 'http://oracle.com']."
 *   -> This is a <a href='http://oracle.com'>super long link text</a>.
————————————————————————————————————————————————
 */

import {runTestCaseList} from '../util/test';

function getFormalizedStringFromMarkup(text: string) {
  const regex = /(\*.*?\*)|(_.*?_)|(\[.*?\|.*?\])/g;
  const matches = text.matchAll(regex);

  let result = '';
  let prevIndex = 0;
  for (const match of matches) {
    const index = match.index;
    const subText = match[0];
    const {length} = subText;

    result += text.substring(prevIndex, index);

    let plain;

    switch (subText[0]) {
      case '*':
        plain = subText.substring(1, length - 1);
        plain = getFormalizedStringFromMarkup(plain);

        result += '<b>' + plain + '</b>';

        break;
      case '_':
        plain = subText.substring(1, length - 1);
        plain = getFormalizedStringFromMarkup(plain);

        result += '<em>' + plain + '</em>';

        break;
      case '[': {
        const delimiterIdx = subText.indexOf('|');
        plain = subText.substring(1, delimiterIdx).trim();
        plain = getFormalizedStringFromMarkup(plain);

        const href = subText.substring(delimiterIdx + 1, length - 1).trim();

        result += '<a href=' + href + '>' + plain + '</a>';

        break;
      }
    }

    prevIndex = (index || 0) + length;
  }

  result += text.substring(prevIndex, text.length);

  return result;
}

// tests

const testInputListCollection = [
  [''],
  ['This word is *bold*.'],
  ['This word is _italics_.'],
  ['This word is _*nested*_.'],
  [
    'This is a *bold section with _italics_ sometimes and _here_* word and this is a _italicized_ word.',
  ],
  ["This is a [link|'http://oracle.com']."],
  ["This is a [*bold link* | 'http://oracle.com']."],
  ["This is a [super long link text | 'http://oracle.com']."],
];

const expectedResultList = [
  '',
  'This word is <b>bold</b>.',
  'This word is <em>italics</em>.',
  'This word is <em><b>nested</b></em>.',
  'This is a <b>bold section with <em>italics</em> sometimes and <em>here</em></b> word and this is a <em>italicized</em> word.',
  "This is a <a href='http://oracle.com'>link</a>.",
  "This is a <a href='http://oracle.com'><b>bold link</b></a>.",
  "This is a <a href='http://oracle.com'>super long link text</a>.",
];

runTestCaseList(
  testInputListCollection,
  expectedResultList,
  getFormalizedStringFromMarkup
);
