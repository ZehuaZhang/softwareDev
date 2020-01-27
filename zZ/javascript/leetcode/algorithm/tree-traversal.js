function preorderTraversal(root) {
    const stack = []
    if (root) {
        stack.push(root)
    }

    const result = []
    while (stack.length) {
        const node = stack.pop()
        result.push(node.val)

        if (node.right) {
            result.push(node.right)
        }

        if (node.left) {
            result.push(node.left)
        }
    }

    return result
}

function inorderTraversal(root) {
    const stack = []
    const result = []
    const node = node

    while (stack.length || node) {
        if (node) {
            stack.push(node)
            node = node.left
        } else {
            node = stack.pop()
            result.push(node.val)
            node = node.right
        }
    }

    return result
}

function postorderTraversal(root) {
    const stack = []
    const result = []
    const node = root

    do {
        while (node) {
            stack.push(node)
            node = node.left
        }

        let prev
        while(stack.length) {
            const curr = stack.pop()

            if (curr.right == prev) {
                result.push(curr.val)
                prev = curr
            } else {
                result.push(curr)
                curr = curr.right
                break
            }
        }

    } while (stack.length)

    return result
}