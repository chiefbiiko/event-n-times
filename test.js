var PassThrough = require('stream').PassThrough
var EventEmitter = require('events').EventEmitter
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

tape('prepending', function (t) {
  var emitter = new EventEmitter()
  emitter = nify(emitter)

  function noop () {}

  function ondata (chunk) {
    t.ok(chunk.length, 'got sth')
  }

  emitter.on('data', noop)
  t.is(emitter.listeners('data').length, 1, 'got one noop data listener')

  emitter.prependNtimeListener('data', 2, ondata)
  t.is(emitter.listeners('data').length, 2, 'got another data listener')
  t.is(emitter.listeners('data').indexOf(noop), 1, 'ondata got prepended')

  emitter.emit('data', Buffer.from([ 4, 1, 9 ]))
  t.end()
})
