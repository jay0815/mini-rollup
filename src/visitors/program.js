const Program = (node, parent, walk, indent) => {
    // 只处理 body 部分
    const magicString = node._mg;
    for (let declaration of node.body) {
      declaration._dependsOn = {};
      declaration._defines = {};
      declaration._source = magicString.snip(declaration.start, declaration.end);
      declaration._included = false;
      const addToStatement = (name) => {
        declaration._dependsOn[name] = true;
      }
      const addToScope = (node) => {
        node._scope.add(node.id.name)
        if (!node._scope.parent) {
          declaration._defines[node.id.name] = true
        }
      }
      declaration._addToStatement = addToStatement;
      declaration._addToScope = addToScope;
      walk.visiter(declaration, node, walk, indent + 1)
    }
}
const Identifier = (node, parent, walk, indent) => {
}

module.exports = {
  Program,
  Identifier
}