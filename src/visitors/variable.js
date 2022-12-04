const VariableDeclarator = (node, parent, walk, indent) => {
  
}

const VariableDeclaration = (node, parent, walk, indent) => {
  for (let declaration of node.declarations) {
    walk.visiter(declaration, node, walk, indent)
  }
}


module.exports = {
  VariableDeclarator,
  VariableDeclaration
}