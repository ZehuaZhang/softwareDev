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
 *   -> This is a <b>bold seciton with <em>italics</em> sometimes and <em>here</em></b>, and this is a <em>italicized</em> word.
————————————————————————————————————————————————
 * "This is a [link|'http://oracle.com']."
 *   -> This is a <a href='http://oracle.com'>link</a>.
 * "This is a [*bold link* | 'http://oracle.com']."
 *   -> This is a <a href='http://oracle.com'><b>bold link</b></a>.
 * "This is a [super long link text | 'http://oracle.com']."
 *   -> This is a <a href='http://oracle.com'>super long link text</a>.
————————————————————————————————————————————————
 */

function getFormalizedStringFromMarkup(text) {
  if (!text) {
    return '';
  }

  const regex = /(\*.*?\*)|(\_.*?\_)|(\[.*?\|.*?\])/g;
  let matches = text.matchAll(regex);

  let result = '';
  let prevIndex = 0;
  for (const match of matches) {
    const index = match.index;
    const substring = match[0];

    result += text.substring(prevIndex, index);

    let plain;

    switch (substring[0]) {
      case '*':
        plain = substring.substring(1, substring.length - 1);
        console.log(plain);
        plain = getFormalizedStringFromMarkup(plain);

        result += '<b>' + plain + '</b>';

        break;
      case '_':
        plain = substring.substring(1, substring.length - 1);
        plain = getFormalizedStringFromMarkup(plain);

        result += '<em>' + plain + '</em>';

        break;
      case '[':
        plain = substring.substring(1, substring.indexOf('|'));
        plain = getFormalizedStringFromMarkup(plain);

        const href = substring.substring(
          substring.indexOf('|') + 1,
          substring.length - 1


        result += '<a href=' + href + '>' + plain + '</a>';

        break;
    }

    prevIndex = match[0].length;
  }

  return result || text;
}

function logOutput(testInputList) {
  testInputList.forEach(testInput => {
    try {
      console.log(
        `Input = ${testInput}\n` +
          `Output = ${getFormalizedStringFromMarkup(testInput)}\n\n`
      );
    } catch (error) {
      console.log(`Input = ${testInput}\n` + `Error = ${error}\n\n`);
    }
  });
}


  const testInputList = [
  'This word is *bold*.',
  'This word is _italics_.',
  'This word is _*nested*_.',
  `This is a [link|'http://oracle.com'].`,
  'This is a [*bold link* | \'http://oracle.com\'].',
  `This is a [super long link text | 'http://oracle.com'].`,
];

logOutput(testInputList);
