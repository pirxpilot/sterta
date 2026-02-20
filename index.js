function swap(heap, p, q, heapIndex) {
  const t = heap[p];
  heap[p] = heap[q];
  heap[q] = t;
  if (heapIndex) {
    heap[p]._heapIndex = p;
    heap[q]._heapIndex = q;
  }
}

function up(heap, smaller, index, heapIndex) {
  if (index <= 1) {
    return;
  }

  const parent = Math.floor(index / 2);
  if (smaller(index, parent)) {
    swap(heap, parent, index, heapIndex);
    up(heap, smaller, parent, heapIndex);
  }
}

function down(heap, smaller, index, heapIndex) {
  const left = 2 * index;
  const right = left + 1;
  let next = index;

  if (left < heap.length && smaller(left, next)) {
    next = left;
  }
  if (right < heap.length && smaller(right, next)) {
    next = right;
  }
  if (next !== index) {
    swap(heap, index, next, heapIndex);
    down(heap, smaller, next, heapIndex);
  }
}

export default function heap(compare = (a, b) => a - b, heapIndex = false) {
  let data = [null]; // 1-index

  const self = {
    push,
    pop,
    peek,
    size,
    rebuild,
    popAndRebuild,
    remove,
    get
  };
  return self;

  function smaller(p, q) {
    return compare(data[p], data[q]) < 0;
  }

  function push(item) {
    data.push(item);
    if (heapIndex) {
      item._heapIndex = data.length - 1;
    }
    up(data, smaller, data.length - 1, heapIndex);
  }

  function pop() {
    if (data.length === 1) {
      return;
    }
    const root = data[1];
    if (data.length === 2) {
      data.length = 1;
    } else {
      data[1] = data.pop();
      if (heapIndex) {
        data[1]._heapIndex = 1;
      }
      down(data, smaller, 1, heapIndex);
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
    const index = heapIndex ? item._heapIndex : data.indexOf(item);
    if (index < 0) {
      return;
    }
    if (index === data.length - 1) {
      data.pop();
      return;
    }

    const fn = smaller(data.length - 1, index) ? up : down;
    data[index] = data.pop();
    if (heapIndex) {
      data[index]._heapIndex = index;
    }
    fn(data, smaller, index, heapIndex);
  }

  function rebuild(initData) {
    if (Array.isArray(initData)) {
      data = [null].concat(initData);
    }

    let i = Math.floor(data.length / 2);
    while (i > 0) {
      down(data, smaller, i--);
    }
    if (heapIndex) {
      data.forEach((item, i) => {
        if (i > 0) {
          item._heapIndex = i;
        }
      });
    }
    return self;
  }

  function popAndRebuild() {
    data.shift();
    rebuild();
    return data[0];
  }
}
