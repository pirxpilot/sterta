const { describe, it } = require('node:test');
const heap = require('..');

describe('heap', function () {
  it('should be empty after init', t => {
    t.assert.deepEqual(heap().get(), []);
    t.assert.equal(heap().pop(), undefined);
  });

  it('should sort items with default comparison function', t => {
    const h = heap();

    h.push(5);
    t.assert.deepEqual(h.get(), [5]);

    h.push(6);
    t.assert.deepEqual(h.get(), [5, 6]);

    h.push(1);
    t.assert.deepEqual(h.get(), [1, 6, 5]);

    h.push(0);
    t.assert.deepEqual(h.get(), [0, 1, 5, 6]);

    h.push(18);
    t.assert.deepEqual(h.get(), [0, 1, 5, 6, 18]);

    h.push(-3);
    t.assert.deepEqual(h.get(), [-3, 1, 0, 6, 18, 5]);

    h.push(6);
    t.assert.deepEqual(h.get(), [-3, 1, 0, 6, 18, 5, 6]);

    t.assert.equal(h.pop(), -3);
    t.assert.deepEqual(h.get(), [0, 1, 5, 6, 18, 6]);

    t.assert.equal(h.pop(), 0);
    t.assert.deepEqual(h.get(), [1, 6, 5, 6, 18]);

    t.assert.equal(h.pop(), 1);
    t.assert.deepEqual(h.get(), [5, 6, 18, 6]);

    t.assert.equal(h.pop(), 5);
    t.assert.deepEqual(h.get(), [6, 6, 18]);

    t.assert.equal(h.pop(), 6);
    t.assert.deepEqual(h.get(), [6, 18]);

    t.assert.equal(h.pop(), 6);
    t.assert.deepEqual(h.get(), [18]);

    t.assert.equal(h.pop(), 18);
    t.assert.deepEqual(h.get(), []);
  });

  it('should sort items with custom comparison function', t => {
    const h = heap((a, b) => b - a);

    h.push(5);
    t.assert.deepEqual(h.get(), [5]);

    h.push(6);
    t.assert.deepEqual(h.get(), [6, 5]);

    h.push(1);
    t.assert.deepEqual(h.get(), [6, 5, 1]);

    h.push(0);
    t.assert.deepEqual(h.get(), [6, 5, 1, 0]);

    h.push(18);
    t.assert.deepEqual(h.get(), [18, 6, 1, 0, 5]);

    h.push(-3);
    t.assert.deepEqual(h.get(), [18, 6, 1, 0, 5, -3]);

    h.push(6);
    t.assert.deepEqual(h.get(), [18, 6, 6, 0, 5, -3, 1]);

    t.assert.equal(h.peek(), 18);
    t.assert.equal(h.pop(), 18);
    t.assert.deepEqual(h.get(), [6, 5, 6, 0, 1, -3]);

    t.assert.equal(h.pop(), 6);
    t.assert.deepEqual(h.get(), [6, 5, -3, 0, 1]);

    t.assert.equal(h.peek(), 6);
    t.assert.equal(h.pop(), 6);
    t.assert.deepEqual(h.get(), [5, 1, -3, 0]);

    t.assert.equal(h.pop(), 5);
    t.assert.deepEqual(h.get(), [1, 0, -3]);

    t.assert.equal(h.pop(), 1);
    t.assert.deepEqual(h.get(), [0, -3]);

    t.assert.equal(h.pop(), 0);
    t.assert.deepEqual(h.get(), [-3]);

    t.assert.equal(h.pop(), -3);
    t.assert.deepEqual(h.get(), []);
  });

  it('should know its size when empty', t => {
    t.assert.deepEqual(heap().size(), 0);
  });

  it('should know its size with elements', t => {
    const h = heap();

    h.push(5);
    h.push(0);
    h.push(5);

    t.assert.deepEqual(h.size(), 3);
  });

  describe('remove', function () {
    it('should remove items', t => {
      const h = heap();

      for (let i = 9; i > 0; i--) {
        h.push(i);
      }

      h.remove(7);
      t.assert.deepEqual(h.get(), [1, 2, 4, 3, 6, 8, 5, 9]);

      h.remove(2);
      t.assert.deepEqual(h.get(), [1, 3, 4, 9, 6, 8, 5]);
    });

    it('should remove items when heap index is used', t => {
      const items = [5, 6, 18, -3, 14, 9].map(function (f) {
        return { f };
      });

      function compare(a, b) {
        return a.f - b.f;
      }

      const hmin = heap(compare, true).rebuild(items);

      hmin.get().forEach(function (item, i) {
        t.assert.deepEqual(item._heapIndex, i + 1);
      });

      hmin.remove(items[3]);
      hmin.remove(items[4]);

      t.assert.equal(hmin.pop(), items[0]);

      hmin.get().forEach(function (item, i) {
        t.assert.deepEqual(item._heapIndex, i + 1);
      });
    });
  });

  it('should rebuild with new data', t => {
    const hmin = heap().rebuild([5, 6, 1, 0, 18, -3, 6]);
    t.assert.deepEqual(hmin.get(), [-3, 0, 1, 6, 18, 5, 6]);

    hmin.rebuild();
    t.assert.deepEqual(hmin.get(), [-3, 0, 1, 6, 18, 5, 6]);

    const hmax = heap(function (a, b) {
      return b - a;
    }).rebuild([5, 6, 1, 0, 18, -3, 6]);
    t.assert.deepEqual(hmax.get(), [18, 6, 6, 0, 5, -3, 1]);
  });

  describe('popAndRebuild', function () {
    it('should rebuild heap after pop', t => {
      const items = [5, 6, 18, -3, 14, 9].map(f => ({ f }));

      function compare(a, b) {
        return a.f - b.f;
      }

      const hmin = heap(compare).rebuild(items);

      // change weight
      items[2].f = -10;

      t.assert.deepEqual(hmin.popAndRebuild(), { f: -3 });
      t.assert.equal(hmin.peek(), items[2]);
    });
  });
});
