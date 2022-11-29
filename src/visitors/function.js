const { print } = require('../utils/space');

const BlockStatement = (node, parent, {
  enter, leave,
  visiter
}, indent) => {
    // enter(undefined, undefined, () => {
    //     console.log(`${indent}function scop start`)
    // })
    node.body.forEach((child) => {
        visiter(child, parent, {
            enter, leave, visiter
        }, indent)
    })
    // leave(undefined, undefined, () => {
    //     console.log(`${print(indent)}function scop end`)
    // })
}

const FunctionDeclaration = (node, parent, {
  enter, leave,
  visiter
}, indent) => {
    const current = enter(parent, () => {
        console.log(`${print(indent)}function ${node.id.name} \t`);
        console.log(`${print(indent)}params: ${node.params.length === 0 ? 'null' : node.params.map((i) => i.name).join(',')}`);
        console.log(`${print(indent)}code line: start from ${node.loc.start.line}, end to ${node.loc.end.line}`);
    });
    node._scope = current;
    visiter(node.body, parent, { enter, leave, visiter }, indent + 1)
    leave(current, node.id.name);
}


module.exports = {
  BlockStatement,
  FunctionDeclaration
}