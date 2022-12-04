const VariableDeclarator = (node, parent, walk, indent) => {
  
}

const VariableDeclaration = (node, parent, walk, indent) => {
  for (let declaration of node.declarations) {
    if (parent && parent.type === 'ExportNamedDeclaration') {
      walk.visiter(declaration, parent, walk, indent)
    } else {
      walk.visiter(declaration, node, walk, indent)
    }
  }
}


module.exports = {
  VariableDeclarator,
  VariableDeclaration
}