const Scope = require('../src/walk/scope');


describe("cast one", () => {
  test("test1", () => {
    // const a = 1;
    // function f() {
    //   const b = 2
    // }
    const root = new Scope();
    root.add('a')
    const child = new Scope({
      parent: root
    });
    child.add('b')
    const leave = new Scope({
      parent: child
    });
    leave.add('c')
    expect(child.contains('a')).toBe(true);
    expect(child.contains('b')).toBe(true);

    expect(child.findDefiningScope('a')).toBe(root);
    expect(child.findDefiningScope('b')).toBe(child);

    expect(leave.findDefiningScope('a')).toBe(root);
  })
})