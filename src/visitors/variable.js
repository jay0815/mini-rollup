const VariableDeclarator = (node, parent, walk, indent) => {
  
}

const VariableDeclaration = (node, parent, walk, indent) => {
  for (let declaration of node.declarations) {
    if (parent && parent.type === 'ExportNamedDeclaration') {
      walk.visiter(declaration, parent, walk, indent)
    } else {
      declaration._scope = node._scope
      walk.visiter(declaration, node, walk, indent)
    }
  }
}


module.exports = {
  VariableDeclarator,
  VariableDeclaration
}