NODE_BIN=./node_modules/.bin
PROJECT=binary-heap

all: check

check: lint test

lint: | node_modules
	$(NODE_BIN)/biome ci

format: | node_modules
	$(NODE_BIN)/biome check --fix

test: | node_modules
	node --test

node_modules: package.json
	yarn
	touch $@

distclean:
	rm -fr node_modules

.PHONY: distclean format lint check all test
