const declaration = (node) => {
  return `typeof: ${node[0].init.type}; valueof: ${node[0].init.value};`
}