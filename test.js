var PassThrough = require('stream').PassThrough
var tape = require('tape')
var nify = require('./index')

tape('ntimes', function (t) {
  var count = 0
  var passthru = new PassThrough()
  passthru = nify(passthru)
  passthru.ntimes('data', 2, function (chunk) {
    t.is(chunk.toString(), 'fraud', 'got args')
    count++
  })
  for (var i = 0; i < 7; i++) passthru.write(Buffer.from('fraud'))
  t.is(count, 2, 'got 2 on it')
  t.end()
})
