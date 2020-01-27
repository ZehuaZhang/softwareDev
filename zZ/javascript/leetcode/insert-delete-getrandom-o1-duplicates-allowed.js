class RandomizedCollection {
    constructor() {
        this.list = []
        this.indexMap = new Map()
    }
    
    insert(number) {
        this.list.push(number)
        if (!this.indexMap.has(number)) {
            this.indexMap.set(number, new Set())
        }
        this.indexMap.get(number).add(this.list.length - 1)
        
        return this.indexMap.get(number).size === 1
    }
    
    remove(number) {
        if (!this.indexMap.has(number)) {
            return false
        }
        
        const indexSet = this.indexMap.get(number)
        const index = indexSet.values().next().value
        indexSet.delete(index)
        
        swap(this.list, index, this.list.length - 1)
        
        if (index !== this.list.length - 1) {
            const swapIndexSet = this.indexMap.get(this.list[index])
            swapIndexSet.delete(this.list.length - 1)
            swapIndexSet.add(index)
        }
        
        if (!indexSet.size) {
            this.indexMap.delete(number)
        }
        this.list.pop()
        
        return true
    }
    
    getRandom() {
        const randomIndex = Math.trunc(Math.random() * this.list.length)
        return this.list[randomIndex]
    }
}

function swap(items, i, j) {
    const temp = items[i]
    items[i] = items[j]
    items[j] = temp
}