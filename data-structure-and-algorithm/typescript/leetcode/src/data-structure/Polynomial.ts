export class Polynomial {
  terms: Term[];
  constructor(terms: Term[] = []) {
    this.terms = terms;
  }

  addTerm(term: Term): Polynomial {
    let left = 0;
    let right = this.terms.length - 1;
    while (left <= right) {
      const mid = Math.trunc((left + right) / 2);
      const diff = this.terms[mid].compare(term);
      if (diff === 0) {
        this.terms[mid].coef += term.coef;
        return this;
      } else if (diff > 0) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    this.terms.splice(left, 0, term);
    return this;
  }

  add(polynomial: Polynomial): Polynomial {
    for (const term of polynomial.terms) {
      this.addTerm(term);
    }
    return this;
  }

  multiply(polynomial: Polynomial): Polynomial {
    const curr = new Polynomial(this.terms);
    this.terms = [];
    polynomial.terms.forEach(term => {
      curr.terms.forEach(currTerm =>
        this.addTerm(term.clone().multiply(currTerm))
      );
    });
    return this;
  }

  output(nameList: string[]): string[] {
    return this.terms.map(term => term.format(nameList)).filter(Boolean);
  }
}

export class Term {
  varList: number[];
  coef: number;
  degree: number;
  constructor(coef: number, varList: number[] = [], degree = 0) {
    this.varList = varList;
    this.coef = coef;
    this.degree = degree;
  }

  setVariables(index: number): void {
    while (this.varList.length <= index) {
      this.varList.push(0);
    }
    ++this.varList[index];
    ++this.degree;
  }

  setCoefficient(coef: number): void {
    this.coef *= coef;
  }

  clone(): Term {
    return new Term(this.coef, [...this.varList], this.degree);
  }

  multiply(term: Term): Term {
    while (this.varList.length < term.varList.length) {
      this.varList.push(0);
    }
    for (let i = 0; i < term.varList.length; ++i) {
      this.varList[i] += term.varList[i];
    }
    this.degree += term.degree;
    this.coef *= term.coef;
    return this;
  }

  compare(term: Term): number {
    let diff = this.degree - term.degree;
    if (diff) {
      return Math.sign(diff);
    }
    for (let i = 0; i < this.varList.length; ++i) {
      diff = this.varList[i] - term.varList[i];
      if (diff) {
        return Math.sign(diff);
      }
    }
    return 0;
  }

  format(nameList: string[]): string {
    return this.coef
      ? this.coef +
          this.varList
            .map((count, i) => `*${nameList[i]}`.repeat(count))
            .join('')
      : '';
  }
}
