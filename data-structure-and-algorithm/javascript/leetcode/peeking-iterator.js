class PeekingIterator extends Iterator {
    constructor() {
        super()

        this.iterator = new Iterator()
        this.value = 0
        this.hasPeeked = false
    }

    peek() {
        if (!hasPeeked) {
            this.value = this.iterator.next()
            this.hasPeeked = true
        }
        return this.value
    }

    hasNext() {
        return this.hasPeeked || this.iterator.hasNext()
    }

    next() {
        if (this.hasPeeked) {
            this.hasPeeked = false
            return this.value
        }

        return this.iterator.next()
    }
}