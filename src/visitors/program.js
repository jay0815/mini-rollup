const Program = (node, parent, {
  enter, leave,
  visiter
}, indent = '') => {
    const current = enter(parent, 'global scope', () => {
      console.log('global scope start')
    });
    for (let declaration of node.body) {
        visiter(declaration, current, {
            enter, leave,
            visiter
        }, indent + "  ")
    }
    leave(current, undefined, () => {
      console.log('global scope end')
    });
}

module.exports = {
  Program,
}