/**
Given an expression such as expression = "e + 8 - a + 5" and an evaluation map such as {"e": 1} (given in terms of evalvars = ["e"] and evalints = [1]), return a list of tokens representing the simplified expression, such as ["-1*a","14"]

An expression alternates chunks and symbols, with a space separating each chunk and symbol.
A chunk is either an expression in parentheses, a variable, or a non-negative integer.
A variable is a string of lowercase letters (not including digits.) Note that variables can be multiple letters, and note that variables never have a leading coefficient or unary operator like "2x" or "-x".
Expressions are evaluated in the usual order: brackets first, then multiplication, then addition and subtraction. For example, expression = "1 + 2 * 3" has an answer of ["7"].

The format of the output is as follows:

For each term of free variables with non-zero coefficient, we write the free variables within a term in sorted order lexicographically. For example, we would never write a term like "b*a*c", only "a*b*c".
Terms have degree equal to the number of free variables being multiplied, counting multiplicity. (For example, "a*a*b*c" has degree 4.) We write the largest degree terms of our answer first, breaking ties by lexicographic order ignoring the leading coefficient of the term.
The leading coefficient of the term is placed directly to the left with an asterisk separating it from the variables (if they exist.)  A leading coefficient of 1 is still printed.
An example of a well formatted answer is ["-2*a*a*a", "3*a*a*b", "3*b*b", "4*a", "5*c", "-6"] 
Terms (including constant terms) with coefficient 0 are not included.  For example, an expression of "0" has an output of [].
Examples:

Input: expression = "e + 8 - a + 5", evalvars = ["e"], evalints = [1]
Output: ["-1*a","14"]

Input: expression = "e - 8 + temperature - pressure",
evalvars = ["e", "temperature"], evalints = [1, 12]
Output: ["-1*pressure","5"]

Input: expression = "(e + 8) * (e - 8)", evalvars = [], evalints = []
Output: ["1*e*e","-64"]

Input: expression = "7 - 7", evalvars = [], evalints = []
Output: []

Input: expression = "a * b * c + b * a * c * 4", evalvars = [], evalints = []
Output: ["5*a*b*c"]

Input: expression = "((a - b) * (b - c) + (c - a)) * ((a - b) + (b - c) * (c - a))",
evalvars = [], evalints = []
Output: ["-1*a*a*b*b","2*a*a*b*c","-1*a*a*c*c","1*a*b*b*b","-1*a*b*b*c","-1*a*b*c*c","1*a*c*c*c","-1*b*b*b*c","2*b*b*c*c","-1*b*c*c*c","2*a*a*b","-2*a*a*c","-2*a*b*b","2*a*c*c","1*b*b*b","-1*b*b*c","1*b*c*c","-1*c*c*c","-1*a*a","1*a*b","1*a*c","-1*b*c"]
Note:

expression will have length in range [1, 250].
evalvars, evalints will have equal lengths in range [0, 100].
*/

class Term {
    constructor(coefficient, variables = [], degree = 0) {
        this.variables = variables;
        this.coefficient = coefficient;
        this.degree = degree;
    }

    setVariables(index) {
        while (this.variables.length <= index) {
            this.variables.push(0);
        }
        ++this.variables[index];
        ++this.degree;
    }

    setCoefficient(coefficient) {
        this.coefficient *= coefficient;
    }

    clone() {
        return new Term(this.coefficient, [...this.variables], this.degree);
    }

    multiply(term) {
        while (this.variables.length < term.variables.length) {
            this.variables.push(0);
        }
        for (let i = 0; i < term.variables.length; ++i) {
            this.variables[i] += term.variables[i];
        }
        this.degree += term.degree;
        this.coefficient *= term.coefficient;
        return this;
    }

    compare(term) {
        let diff = this.degree - term.degree;
        if (diff !== 0) {
            return Math.sign(diff);
        }
        for (let i = 0; i < this.variables.length; ++i) {
            diff = this.variables[i] - term.variables[i];
            if (diff !== 0) {
                return Math.sign(diff);
            }
        }
        return 0;
    }

    format(name) {
        return this.coefficient === 0 ? "" : this.coefficient + this.variables.map((v, i) => `*${name[i]}`.repeat(v)).join('');
    }
}

class Polynomial {
    constructor(terms = []) {
        this.terms = terms;
    }

    addTerm(term) {
        let left = 0, right = this.terms.length - 1;
        while (left <= right) {
            const mid = Math.trunc((left + right) / 2);
            const diff = this.terms[mid].compare(term);
            if (diff ===  0) {
                this.terms[mid].coefficient += term.coefficient;
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

    add(polynomial) {
        for (let term of polynomial.terms) {
            this.addTerm(term);
        }
        return this;
    }

    multiply(polynomial) {
        const curr = new Polynomial(this.terms);
        this.terms = [];
        polynomial.terms.forEach(term => {
            curr.terms.forEach(t => this.addTerm(term.clone().multiply(t)));
        });
        return this;
    }

    output(names) {
        return this.terms.map(term => term.format(names)).filter(Boolean);
    }
}

function basicCalculatorIV(expression, evalvars, evalints) {
    const varSet = new Set();
    const evalMap = new Map(evalvars.map((v, i) => [v, evalints[i]]));
    const tokens = expression.match(/[a-zA-Z]+|\d+|\S/g);
    for (let i = 0; i < tokens.length; ++i) {
        if (tokens[i] >= 'A') {
            let num = evalMap.get(tokens[i]);
            if (num !== undefined) {
                tokens[i] = num;
            } else {
                varSet.add(tokens[i]);
            }
        }
    }
    const [variables, iter] = [[...varSet].sort(), tokens.values()];

    const varMap = new Map(variables.map((v, i) => [v, i]));

    const result = parse(varMap, iter);
    return result.output(variables);
}

function parse(varMap, iter, sign = 1) {
    const polynomial = new Polynomial();
    let term = parseTerm(varMap, iter, sign);
    for (let token of iter) {
        if (token === ")") {
            break;
        }
        if (token === '*') {
            term.multiply(parseTerm(varMap, iter, 1));
        } else {
            polynomial.add(term);
            term = parseTerm(varMap, iter, token === '+' ? sign : -sign); 
        }
    }
    return polynomial.add(term);
}

function parseTerm(varMap, iter, sign = 1) {
    const token = iter.next().value;
    if (token === "(") {
        return parse(varMap, iter, sign);
    }
    const term = new Term(sign);
    if (token >= "A") {
        term.setVariables(varMap.get(token));
    } else {
        term.setCoefficient(new Number(token));
    }
    return new Polynomial([term]);
}