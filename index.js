function ntimes (event, n, handler) {
  this.on(event, function proxy (...args) {
    if (++this._count > n) return this.removeListener(event, proxy)
    handler.call(this, ...args)
  })
}

function nify (emitter) {
  if (!emitter.on) throw new TypeError('emitter does not have an .on method')
  emitter._count = 0
  emitter.ntimes = ntimes
  return emitter
}

module.exports = nify
