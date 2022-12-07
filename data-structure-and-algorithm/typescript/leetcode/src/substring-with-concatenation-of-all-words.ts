// 30. Substring with Concatenation of All Words

// You are given a string, s, and a list of words, words, that are all of the same length. Find all starting indices of substring(s) in s that is a concatenation of each word in words exactly once and without any intervening characters.

// Example 1:

// Input:
//   s = "barfoothefoobarman",
//   words = ["foo","bar"]
// Output: [0,9]
// Explanation: Substrings starting at index 0 and 9 are "barfoo" and "foobar" respectively.
// The output order does not matter, returning [9,0] is fine too.
// Example 2:

// Input:
//   s = "wordgoodgoodgoodbestword",
//   words = ["word","good","best","word"]
// Output: []

/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
const findSubstring = function (s, words) {
  if (!isString(s) || !isArray(words)) {
    throw 'invalid input types';
  }

  const wordCount = {};
  for (const word of words) {
    if (!wordCount.hasOwnProperty(word)) {
      wordCount[word] = 0;
    }
    ++wordCount[word];
  }

  const wordLength = words.length ? words[0].length : 0;

  const result = [];
  for (let i = wordLength; i <= s.length; ++i) {
    const substring = s.substring(i - wordLength, i);
    if (wordCount.hasOwnProperty(substring)) {
      const wordCountCopy = {
        ...wordCount,
      };

      for (let j = i; j <= s.length; j += wordLength) {
        const wordToVerify = s.substring(j - wordLength, j);

        if (wordCountCopy.hasOwnProperty(wordToVerify)) {
          --wordCountCopy[wordToVerify];
        } else {
          break;
        }

        if (wordCountCopy[wordToVerify] === 0) {
          delete wordCountCopy[wordToVerify];
        }
      }

      if (
        Object.keys(wordCountCopy).filter(key =>
          wordCountCopy.hasOwnProperty(key)
        ).length === 0
      ) {
        result.push(i - wordLength);
      }
    }
  }

  return result;
};

function isString(item) {
  return typeof item === 'string';
}

function isArray(item) {
  return Array.isArray(item);
}
