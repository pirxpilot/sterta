[![NPM version][npm-image]][npm-url]
[![Build Status][build-image]][build-url]
[![Dependency Status][deps-image]][deps-url]

# binary-heap

  [Binary heap](http://en.wikipedia.org/wiki/Binary_heap)

## Installation

```sh
$ npm install --save conde42day-binary-heap
```

## Usage

```
  var h = heap();
  h.push(5);
  h.push(2);

  h.pop(); // 2
  h.pop(); // 5
  h.pop(); // undefined
```

## API

### `heap(fn, heapIndex)`

`fn` - compare function, by default numerical comparison resulting in `min-heap`, see tests for `max-heap` example
`heapIndex` - if truthy, heap will use item's `_heapIndex` property to track its position on the heap, it speeds up item removals, but can slow down operations for smaller heaps


### `push(item)`

adds `item` to the heap

### `pop()`

pops item from the top of the heap, rebalances the head

### `peek()`

returns the top of the heap, without removing it

### `rebuild(data)`

rebuilds heap to satisfy comparison constraint, if `data` is provided it is used to reinitialize the heap

### `popAndRebuild()`

pop and immediately rebuild the heap, implemented in a slightly more efficient manner than separate `pop()` and
`rebuild()`- useful when heap needs to be rebalanced after top is removed, because some of the items might have changed
their relative weights

## License

MIT © [Damian Krzeminski](https://pirxpilot.me)

[npm-image]: https://img.shields.io/npm/v/sterta
[npm-url]: https://npmjs.org/package/sterta

[build-url]: https://github.com/pirxpilot/sterta/actions/workflows/check.yaml
[build-image]: https://img.shields.io/github/actions/workflow/status/pirxpilot/sterta/check.yaml?branch=main

[deps-image]: https://img.shields.io/librariesio/release/npm/sterta
[deps-url]: https://libraries.io/npm/sterta
