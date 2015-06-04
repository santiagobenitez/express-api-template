'use strict';

function getRoot(req, res, next) {
  res.send('<h1>Hello World</h1>');
}

function getRootApi(req, res, next) {
  res.send('<h1>Hello World</h1>');
}

module.exports = {
  getRoot: getRoot,
  getRootApi: getRootApi
};
