REPORTER = spec
MOCHA_OPTS = --ui tdd

test:
	clear
	echo Starting test ***********
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	tests/middlewares/*.js tests/services/*.js tests/routes/*.js 
	echo Ending test *************

test-data:
	clear
	echo Starting test ***********
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	tests/data/*.js
	echo Ending test *************

test-i: export NODE_ENV = test
test-i:
	clear
	echo Starting test ***********
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	integration-tests/*.js
	echo Ending test *************

.PHONY: test test-i test-data
