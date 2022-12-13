const ExpressionStatement = (node, parent, walk, indent) => {
    walk.visiter(node.expression, node, walk, indent + 1)
}
const CallExpression = (node, parent, walk, indent) => {
    walk.visiter(node.callee, node, walk, indent)
}


module.exports = {
  ExpressionStatement,
  CallExpression
}