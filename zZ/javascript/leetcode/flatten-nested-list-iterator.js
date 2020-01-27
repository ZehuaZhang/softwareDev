/**
 * Your NestedIterator will be called like this:
 * var i = new NestedIterator(nestedList), a = [];
 * while (i.hasNext()) a.push(i.next());
*/

class NestedIterator {
    constructor(list) {
        this.stack = []
        list.reverse().forEach(entry => this.stack.push(entry))
    }
    
    hasNext() {
        while (this.stack.length) {
            const top = this.stack[this.stack.length - 1]
            if (top.isInteger()) {
                return true
            }
            this.stack.pop()
            
            top.getList().reverse().forEach(entry => this.stack.push(entry))
        } 
        
        return false
    }
    
    next() {
        return this.stack.pop().getInteger()
    }
}