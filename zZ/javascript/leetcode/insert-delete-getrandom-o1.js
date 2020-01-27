class RandomizedSet {
    constructor() {
        this.list = []
        this.indexMap = new Map()
    }
    
    insert(number) {
        if (this.indexMap.has(number)) {
            return false
        }
        
        this.list.push(number)
        this.indexMap.set(number, this.list.length - 1)
        return true
    }
    
    remove(number) {
        if (!this.indexMap.has(number)) {
            return false
        }
        
        const index = this.indexMap.get(number)
        swap(this.list, index, this.list.length - 1)
        this.indexMap.set(this.list[index], index)
        
        this.indexMap.delete(number)
        this.list.pop()
        
        return true
    }
    
    getRandom() {
        return this.list[Math.trunc(Math.random() * this.list.length)]
    }
}

function swap(items, i, j) {
    const temp = items[i]
    items[i] = items[j]
    items[j] = temp
}