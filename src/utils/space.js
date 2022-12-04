const print = (indent, msg) => {
  console.log(`${" ".repeat(indent * 2)}${msg}`);
}

module.exports = {
  print
}