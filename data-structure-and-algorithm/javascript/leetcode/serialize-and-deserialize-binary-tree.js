/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
function serialize(root) {
    const result = []
    serializeHelper(root, result)
    
    return result.join(" ")
}

function serializeHelper(root, result) {
    if (!root) {
        result.push("#")
    } else {
        result.push(root.val)
        serializeHelper(root.left, result)
        serializeHelper(root.right, result)
    }
}

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
function deserialize(data) {
    data = data.split(" ")
    const iterator = data[Symbol.iterator]()
    return deserializeHelper(iterator)
}

function deserializeHelper(iterator) {
    const value = iterator.next().value
   if (value === "#") {
        return null
    } 
    
    const node = new TreeNode(value)
    node.left = deserializeHelper(iterator)
    node.right = deserializeHelper(iterator)

    return node
}