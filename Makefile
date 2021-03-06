NODE_BIN=./node_modules/.bin
PROJECT=binary-heap

all: check compile

check: lint test

lint:
	$(NODE_BIN)/jshint index.js test

test:
	$(NODE_BIN)/mocha --require should test

compile: build/build.js

build/build.js: node_modules index.js
	mkdir -p build
	browserify --require ./index.js:$(PROJECT) --outfile $@

node_modules: package.json
	npm install && touch $@

clean:
	rm -fr build

distclean: clean
	rm -fr node_modules

.PHONY: clean distclean lint check all compile test
