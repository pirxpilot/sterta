
# binary-heap

  [Binary heap](http://en.wikipedia.org/wiki/Binary_heap)

## Installation

  Install with [component(1)](http://component.io):

    $ component install code42day/binary-heap

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

###heap(fn)

`fn` - compare function, by default numerical comparison resulting in `min-heap`, see tests for `max-heap` example

###push(item)

adds `item` to the heap

###pop()

pops item from the top of the heap, rebalances the head

###rebuild(data)

rebuilds heap to satisfy comparison constraint, if `data` is provided it is used to reinitialize the heap

## License

  The MIT License (MIT)

  Copyright (c) 2014 <copyright code42day>

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
