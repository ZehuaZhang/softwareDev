class AllOne {
    constructor() {
        this.head = new Bucket(-Infinity);
        this.tail = new Bucket(Infinity);
        this.head.next = this.tail;
        this.head.prev = this.head;
        this.keyBucket = new Map();
    }

    inc(key) {
        if (!this.keyBucket.has(key)) {
            const bucket = new Bucket(0, key);
            this.insert(bucket, this.head);
            this.keyBucket.set(key, bucket);
        }

        const curr = this.keyBucket.get(key);
        let next = curr.next;
        if (next === null || next.value > curr.value + 1) {
            next = new Bucket(curr.value + 1);
            this.insert(curr, next);
        }
        next.keys.add(key);
        this.keyBucket.set(key, next);

        this.remove(key, curr);
    }

    dec(key) {
        if (!this.keyBucket.has(key)) {
            return;
        }
        
        const curr = this.keyBucket.get(key);
        let prev = curr.prev;
        if (curr.value > 1) {
            if (prev === null || prev.value < curr.value - 1) {
                prev = new Bucket(curr.value - 1);
                this.insert(curr.prev, prev);
            }
            prev.keys.add(key);
            this.keyBucket.set(key, prev);
        }

        this.remove(key, curr);
    }

    getMaxKey() {
        return this.tail.prev === this.head ? "" : this.tail.keys[Symbol.iterator]().next().value;
    }

    getMinKey() {
        return this.head.next === this.tail ? "": this.head.keys[Symbol.iterator]().next().value;
    }

    insert(prev, curr) {
        curr.next = prev.next;
        curr.prev = prev;
        prev.next.prev = curr;
        prev.next = curr;

    }

    remove(key, curr) {
        curr.keys.delete(key);
        if (curr.keys.size === 0) {
            curr.prev.next = curr.next;
            curr.next.prev = curr.prev;
        }
    }
}

class Bucket {
    constructor(value, ...keyList) {
        this.value = value;
        this.keys = new Set([...keyList]);
        this.prev = null;
        this.next = null;
    }
}