REPORTER = spec
MOCHA_OPTS = --ui tdd

test:
	clear
	echo Starting test ***********
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	tests/**/*.js
	echo Ending test *************

test-w:
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	--growl \
	--watch \
	$(MOCHA_OPTS) \
	tests/**/*.js

test-cliente-repo:
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	--growl \
	$(MOCHA_OPTS) \
	tests/data/cliente.repository.spec.js

test-i:
	clear
	echo Starting test ***********
	./node_modules/mocha/bin/mocha \
	--reporter $(REPORTER) \
	$(MOCHA_OPTS) \
	integration-tests/*.js
	echo Ending test *************

.PHONY: test test-w test-cliente-repo test-i
