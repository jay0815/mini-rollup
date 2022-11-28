/**
 * 
 * @param {*} node 
 * @param {*} parent 
 * @param {} enter // callback when enter  
 * @param {*} leave // callback when leave
 * @returns 
 */
function visiter (node, parent, enter, leave) {
  enter(node)
  if (typeof node === 'object') {
    Object.keys(node).forEach((key) => {
      if (typeof node[key] === 'object') {
        visiter(node[key], node, enter, leave);
      }
    })
  }
  leave(node)
  return 'a';
}

module.exports = visiter