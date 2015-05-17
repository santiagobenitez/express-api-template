REPORTER = list
MOCHA_OPTS = --ui tdd

test:
	clear
	echo Starting test ***********
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	unit-tests/*.js
	echo Ending test *************

test-w:
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	--growl \
	--watch \
	$(MOCHA_OPTS) \
	unit-tests/*.js

test-i:
	clear
	echo Starting test ***********
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	integration-tests/*.js
	echo Ending test *************

.PHONY: test test-w test-i
