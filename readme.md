# event-n-times

[![build status](http://img.shields.io/travis/chiefbiiko/event-n-times.svg?style=flat)](http://travis-ci.org/chiefbiiko/event-n-times) [![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/github/chiefbiiko/event-n-times?branch=master&svg=true)](https://ci.appveyor.com/project/chiefbiiko/event-n-times)

***

Register event handlers with a max cap.

***

## Get it!

```
npm install --save event-n-times
```

***

## Usage

``` js
var nify = require('event-n-times')
var passthru = require('stream').PassThrough()

passthru = nify(passthru)

passthru.ntimes('data', 2, function (chunk) {
  console.log(chunk.toString())
})

for (var i = 0; i < 7; i++) passthru.write(Buffer.from('fraud'))
```

***

## API

### `emitter = nify(emitter)`

Add a `.ntimes` instance method on the `emitter`.

### `emitter.ntimes(event, n, handler)`

Register an event handler that will be called at most `n` times.

***

## License

[MIT](./license.md)
