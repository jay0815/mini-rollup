const Program = (node, parent, {
  enter, leave,
  visiter
}, indent = 0) => {
    // const current = enter(parent, 'global scope', () => {
    //   console.log('global scope start')
    // });
    for (let declaration of node.body) {
        visiter(declaration, parent, {
            enter, leave,
            visiter
        }, indent + 1)
    }
    // leave(current, undefined, () => {
    //   console.log('global scope end')
    // });
}

module.exports = {
  Program,
}