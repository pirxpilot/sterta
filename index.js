module.exports = heap;


function swap(heap, p, q) {
  var t = heap[p];
  heap[p] = heap[q];
  heap[q] = t;
}


function up(heap, smaller, index) {
  if (index <= 1) {
    return;
  }

  var parent = Math.floor(index / 2);
  if (smaller(index, parent)) {
    swap(heap, parent, index);
    up(heap, smaller, parent);
  }
}

function down(heap, smaller, index) {
  var left = 2 * index,
    right = left + 1,
    next = index;

  if (left < heap.length && smaller(left, next)) {
    next = left;
  }
  if (right < heap.length && smaller(right, next)) {
    next = right;
  }
  if (next !== index) {
    swap(heap, index, next);
    down(heap, smaller, next);
  }
}

function heap(compare) {
  var self, data = [null]; // 1-index

  compare = compare || function(a, b) { return a - b; };

  function smaller(p, q) {
    return compare(data[p], data[q]) < 0;
  }

  function push(item) {
    data.push(item);
    up(data, smaller, data.length - 1);
  }

  function pop() {
    if (data.length === 1) {
      return;
    }
    var root = data[1];
    if (data.length === 2) {
      data.length = 1;
    } else {
      data[1] = data.pop();
      down(data, smaller, 1);
    }
    return root;
  }

  function peek() {
    return data[1];
  }

  function size() {
    return data.length - 1;
  }

  function get() {
    return data.slice(1);
  }

  function remove(item) {
    var fn, index = data.indexOf(item);

    if (index < 0) {
      return;
    }
    if (index === data.length - 1) {
      data.pop();
      return;
    }

    fn = smaller(data.length - 1, index) ? up : down;
    data[index] = data.pop();
    fn(data, smaller, index);
  }

  function rebuild(initData) {
    if (Array.isArray(initData)) {
      data = [null].concat(initData);
    }

    var i = Math.floor(data.length / 2);
    while(i > 0) {
      down(data, smaller, i--);
    }

    return self;
  }

  function popAndRebuild() {
    data.shift();
    rebuild();
    return data[0];
  }


  self = {
    push: push,
    pop: pop,
    peek: peek,
    size: size,
    rebuild: rebuild,
    popAndRebuild: popAndRebuild,
    remove: remove,
    get: get
  };

  return self;
}
