class Tree {
    static toSerializedArray(root) {
        const list = [];
        toArrayDFS(root, list);
        return list;

        function toArrayDFS(node, list) {
            if (node === null) {
                list.push("#");
                return;
            }

            list.push(node.val);
            toArrayDFS(node.left, list);
            toArrayDFS(node.right, list);
        }
    }

    static fromSerialziedArray(list) {
        const iter = list.values();
        return fromArrayDFS(iter);

        function fromArrayDFS(iter) {
            const { value, done } = iter.next();
            if (done || value === "#") {
                return null;
            }
            const node = new TreeNode(value);
            node.left = fromArrayDFS(iter);
            node.right = fromArrayDFS(iter);
            return node;
        }
    }

    static toArray(root) {
        const list = [];
        toArrayDFS(root, list);
        console.log(list);

        function toArrayDFS(node, list) {
            if (node === null) {
                return;
            }
            list.push(node.val);
            toArrayDFS(node.left, list);
            toArrayDFS(node.right, list);
        }
    }

    static toLevelArray(root) {
        const result = [];
        toLevelArrayDFS(root, 1);
        console.log(result);

        function toLevelArrayDFS(node, level) {
            if (node === null) {
                return;
            }
            if (result.length < level) {
                result.push([]);
            }
            result[level - 1].push(node.val);
            toLevelArrayDFS(node.left, level + 1);
            toLevelArrayDFS(node.right, level + 1);
        }
    }
}

class List {
    static fromArray(...arr) {
        const dummy = new Node();
        let prev = dummy;
        for (const a of arr) {
            prev.next = new Node();
            prev = prev.next;
        }
        return dummy.next;
    }

    static toArray(head) {
        const arr = [];
        for (; head; head = head.next) {
            arr.push(head.val);
        }
        return arr;
    }
}