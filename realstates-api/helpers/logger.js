'use strict';

var bunyan = require('bunyan');

var log = bunyan.createLogger({
  name: 'realstates',
  serializers: bunyan.stdSerializers,
  streams: [
    {
      level: 'info',
      stream: process.stdout            // log INFO and above to stdout
    },
    {
      level: 'info',
      path:  __dirname + '/../logs/realstates.log'  // log ERROR and above to a file
    }
  ]
});

module.exports = log;
