const VariableDeclarator = (node, parent, {
  enter, leave,
}, indent) => {
  const current = enter(parent, 'declaration');
  if (node.init) {
    leave(current, {
      value: node.init.value || node.init.name,
      name: node.id.name
    })
  } else {
    leave(undefined)
  }
}

const VariableDeclaration = (node, parent, {
  enter, leave,
  visiter
}, indent) => {
  const current = enter(parent, 'variable');
  for (let declaration of node.declarations) {
    visiter(declaration, current, {
      enter, leave, visiter
    }, indent + "  ")
  }
  leave(current, undefined, () => {
      console.log(`${indent}${current.type} ${current.children.map((i) => i.value.name).join(',')} \t`);
      console.log(`${indent}init value: ${current.children.map((i) => i.value.value).join(',')}`);
      console.log(`${indent}code line: start from ${node.loc.start.line}, end to ${node.loc.end.line}`);
  });

}


module.exports = {
  VariableDeclarator,
  VariableDeclaration
}