const { describe, it } = require('node:test');
const should = require('should');
const heap = require('..');

describe('heap', function () {
  it('should be empty after init', function () {
    heap().get().should.eql([]);
    should.not.exist(heap().pop());
  });

  it('should sort items with default comparison function', function () {
    const h = heap();

    h.push(5);
    h.get().should.eql([5]);

    h.push(6);
    h.get().should.eql([5, 6]);

    h.push(1);
    h.get().should.eql([1, 6, 5]);

    h.push(0);
    h.get().should.eql([0, 1, 5, 6]);

    h.push(18);
    h.get().should.eql([0, 1, 5, 6, 18]);

    h.push(-3);
    h.get().should.eql([-3, 1, 0, 6, 18, 5]);

    h.push(6);
    h.get().should.eql([-3, 1, 0, 6, 18, 5, 6]);

    h.pop().should.eql(-3);
    h.get().should.eql([0, 1, 5, 6, 18, 6]);

    h.pop().should.eql(0);
    h.get().should.eql([1, 6, 5, 6, 18]);

    h.pop().should.eql(1);
    h.get().should.eql([5, 6, 18, 6]);

    h.pop().should.eql(5);
    h.get().should.eql([6, 6, 18]);

    h.pop().should.eql(6);
    h.get().should.eql([6, 18]);

    h.pop().should.eql(6);
    h.get().should.eql([18]);

    h.pop().should.eql(18);
    h.get().should.eql([]);
  });


  it('should sort items with custom comparison function', function () {
    const h = heap(function (a, b) {
      return b - a;
    });

    h.push(5);
    h.get().should.eql([5]);

    h.push(6);
    h.get().should.eql([6, 5]);

    h.push(1);
    h.get().should.eql([6, 5, 1]);

    h.push(0);
    h.get().should.eql([6, 5, 1, 0]);

    h.push(18);
    h.get().should.eql([18, 6, 1, 0, 5]);

    h.push(-3);
    h.get().should.eql([18, 6, 1, 0, 5, -3]);

    h.push(6);
    h.get().should.eql([18, 6, 6, 0, 5, -3, 1]);

    h.peek().should.eql(18);
    h.pop().should.eql(18);
    h.get().should.eql([6, 5, 6, 0, 1, -3]);

    h.pop().should.eql(6);
    h.get().should.eql([6, 5, -3, 0, 1]);

    h.peek().should.eql(6);
    h.pop().should.eql(6);
    h.get().should.eql([5, 1, -3, 0]);

    h.pop().should.eql(5);
    h.get().should.eql([1, 0, -3]);

    h.pop().should.eql(1);
    h.get().should.eql([0, -3]);

    h.pop().should.eql(0);
    h.get().should.eql([-3]);

    h.pop().should.eql(-3);
    h.get().should.eql([]);
  });

  it('should know its size when empty', function () {
    heap().size().should.eql(0);
  });

  it('should know its size with elements', function () {
    const h = heap();

    h.push(5);
    h.push(0);
    h.push(5);


    h.size().should.eql(3);
  });

  describe('remove', function () {
    it('should remove items', function () {
      let i;
      const h = heap();

      for (i = 9; i > 0; i--) {
        h.push(i);
      }

      h.remove(7);
      h.get().should.eql([1, 2, 4, 3, 6, 8, 5, 9]);

      h.remove(2);
      h.get().should.eql([1, 3, 4, 9, 6, 8, 5]);
    });

    it('should remove items when heap index is used', function () {
      const items = [5, 6, 18, -3, 14, 9].map(function (f) {
        return { f };
      });

      function compare(a, b) { return a.f - b.f; }

      const hmin = heap(compare, true).rebuild(items);

      hmin.get().forEach(function (item, i) {
        item._heapIndex.should.eql(i + 1);
      });

      hmin.remove(items[3]);
      hmin.remove(items[4]);

      hmin.pop().should.be.exactly(items[0]);

      hmin.get().forEach(function (item, i) {
        item._heapIndex.should.eql(i + 1);
      });
    });

  });

  it('should rebuild with new data', function () {
    let hmin;
    let hmax;

    hmin = heap().rebuild([5, 6, 1, 0, 18, -3, 6]);
    hmin.get().should.eql([-3, 0, 1, 6, 18, 5, 6]);

    hmin.rebuild();
    hmin.get().should.eql([-3, 0, 1, 6, 18, 5, 6]);

    hmax = heap(function (a, b) {
      return b - a;
    }).rebuild([5, 6, 1, 0, 18, -3, 6]);
    hmax.get().should.eql([18, 6, 6, 0, 5, -3, 1]);
  });

  describe('popAndRebuild', function () {
    it('should rebuild heap after pop', function () {
      const items = [5, 6, 18, -3, 14, 9].map(function (f) {
        return { f };
      });

      function compare(a, b) { return a.f - b.f; }

      const hmin = heap(compare).rebuild(items);

      // change weight
      items[2].f = -10;

      hmin.popAndRebuild().should.eql({ f: -3 });
      hmin.peek().should.be.exactly(items[2]);
    });
  });
});
