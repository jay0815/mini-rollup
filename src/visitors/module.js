const ExportNamedDeclaration = (node, parent, walk, indent) => {
    // 只处理 body
    walk.visiter(node.declaration, node, walk, indent)
}
const ExportDefaultDeclaration = (node, parent, walk, indent) => {
    // 只处理 body
    walk.visiter(node.declaration, node, walk, indent)
}

const ImportDeclaration = (node, parent, walk, indent) => {
    // 只处理 body
    node.specifiers.forEach((specifier) => {
        walk.visiter(specifier, node, walk, indent)
    })
}
const ImportSpecifier = (node, parent, walk, indent) => {
}
const ImportDefaultSpecifier = (node, parent, walk, indent) => {
}

module.exports = {
  ExportNamedDeclaration,
  ImportDeclaration,
  ImportSpecifier,
  ImportDefaultSpecifier,
  ExportDefaultDeclaration
}