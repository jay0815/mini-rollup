const BlockStatement = (node, parent, walk, indent) => {
    // 只处理 body
    node.body.forEach((child) => {
        walk.visiter(child, node, walk, indent)
    })
}

const FunctionDeclaration = (node, parent, walk, indent) => {
    if (parent && parent.type === "ExportNamedDeclaration") {
        walk.visiter(node.body, parent, walk, indent)
    } else {
        walk.visiter(node.body, node, walk, indent + 1)
    }
}

module.exports = {
  BlockStatement,
  FunctionDeclaration
}