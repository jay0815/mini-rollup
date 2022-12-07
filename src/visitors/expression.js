const ExpressionStatement = () => {
    walk.visiter(node.expression, node, walk, indent + 1)
}
const CallExpression = () => {
    walk.visiter(node.body, node, walk, indent + 1)
}


module.exports = {
  ExpressionStatement,
  CallExpression
}