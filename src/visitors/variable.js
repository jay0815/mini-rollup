const { print } = require('../utils/space');

const VariableDeclarator = (node, parent, {
  enter, leave,
}) => {
  const current = enter(parent);
  leave(current, node.id.name)
}

const VariableDeclaration = (node, parent, {
  enter, leave,
  visiter
}, indent) => {
  const current = enter(parent);
  node._scope = current;
  for (let declaration of node.declarations) {
    visiter(declaration, current, {
      enter, leave, visiter
    }, indent + 1)
  }
  // leave(current, undefined, () => {
  //     console.log(`${print(indent)}${current.type} ${current.children.map((i) => i.value.name).join(',')} \t`);
  //     console.log(`${print(indent)}init value: ${current.children.map((i) => i.value.value).join(',')}`);
  //     console.log(`${print(indent)}code line: start from ${node.loc.start.line}, end to ${node.loc.end.line}`);
  // });

}


module.exports = {
  VariableDeclarator,
  VariableDeclaration
}