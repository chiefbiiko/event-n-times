var nify = require('./index')
var passthru = require('stream').PassThrough()

passthru = nify(passthru)

passthru.ntimes('data', 2, function (chunk) {
  console.log(chunk.toString())
})

for (var i = 0; i < 7; i++) passthru.write(Buffer.from('fraud'))
