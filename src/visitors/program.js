const Program = (node, parent, walk, indent) => {
    // 只处理 body 部分
    for (let declaration of node.body) {
        walk.visiter(declaration, node, walk, indent + 1)
    }
}

module.exports = {
  Program,
}