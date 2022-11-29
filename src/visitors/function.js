const BlockStatement = (node, parent, {
  enter, leave,
  visiter
}, indent) => {
    enter(undefined, undefined, () => {
        console.log(`${indent}function scop start`)
    })
    node.body.forEach((child) => {
        visiter(child, parent, {
            enter, leave, visiter
        }, indent)
    })
    leave(undefined, undefined, () => {
        console.log(`${indent}function scop end`)
    })
}

const FunctionDeclaration = (node, parent, {
  enter, leave,
  visiter
}, indent) => {
    const current = enter(parent, 'function', () => {
        console.log(`${indent}function ${node.id.name} \t`);
        console.log(`${indent}params: ${node.params.length === 0 ? 'null' : node.params.map((i) => i.name).join(',')}`);
        console.log(`${indent}code line: start from ${node.loc.start.line}, end to ${node.loc.end.line}`);
    });
    visiter(node.body, parent, { enter, leave, visiter }, indent + "  ")
    leave(current, node.id.name);
}


module.exports = {
  BlockStatement,
  FunctionDeclaration
}