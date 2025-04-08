NODE_BIN=./node_modules/.bin
PROJECT=binary-heap

all: check

check: lint test

lint: | node_modules
	$(NODE_BIN)/jshint index.js test

test: | node_modules
	node --test

node_modules: package.json
	yarn
	touch $@

distclean:
	rm -fr node_modules

.PHONY: distclean lint check all test
