class ValidWordAbbreviation {
  constructor(dictionary) {
    this.abbreviationWordSetMap = {};
    for (const word of dictionary) {
      const abbreviation = this.getAbbreviation(word);
      if (!this.abbreviationWordSetMap.hasOwnProperty(abbreviation)) {
        this.abbreviationWordSetMap[abbreviation] = new Set();
      }
      this.abbreviationWordSetMap[abbreviation].add(word);
    }
  }

  isUnique(word) {
    const abbreviation = this.getAbbreviation(word);
    return (
      !this.abbreviationWordSetMap.hasOwnProperty(abbreviation) ||
      this.abbreviationWordSetMap[abbreviation].length === 1
    );
  }

  getAbbreviation(word) {
    return word[0] + (word.length - 2).toString() + word[word.length - 1];
  }
}
