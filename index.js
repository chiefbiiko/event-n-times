function ntimes (event, n, handler) {
  this.on(event, function proxy (...args) {
    if (++this._count > n) return this.removeListener(event, proxy)
    handler.call(this, ...args)
  })
}

function nify (emitter) {
  emitter._count = 0
  emitter.ntimes = ntimes
  return emitter
}

module.exports = nify
