var heap = require('..');
var should = require('should');


/* global describe, it */


describe('heap', function() {
  it('should be empty after init', function() {
    heap().get().should.eql([]);
    should.not.exist(heap().pop());
  });

  it('should sort items with default comparison function', function() {
    var h = heap();

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


  it('should sort items with custom comparison function', function() {
    var h = heap(function(a, b) {
      return b -a;
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

    h.pop().should.eql(18);
    h.get().should.eql([6, 5, 6, 0, 1, -3]);

    h.pop().should.eql(6);
    h.get().should.eql([6, 5, -3, 0, 1]);

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

  it('should know its size when empty', function() {
    heap().size().should.eql(0);
  });

  it('should know its size with elements', function() {
    var h = heap();

    h.push(5);
    h.push(0);
    h.push(5);


    h.size().should.eql(3);
  });

  it('should remove items', function() {
    var i, h = heap();

    for (i = 9; i > 0; i--) {
      h.push(i);
    }

    h.remove(7);
    h.get().should.eql([1, 2, 4, 3, 6, 8, 5, 9]);

    h.remove(2);
    h.get().should.eql([ 1, 3, 4, 9, 6, 8, 5]);
  });

});