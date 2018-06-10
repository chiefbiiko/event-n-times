function ntimes (prepend, eventName, n, handler) {
  function proxy (...args) {
    if (++this._count > n) return this.removeListener(eventName, proxy)
    handler(...args)
  }
  if (prepend) this.prependListener(eventName, proxy)
  else this.on(eventName, proxy)
}

function nify (emitter) {
  emitter._count = 0
  emitter.ntimes = emitter.addNtimeListener = ntimes.bind(emitter, false)
  emitter.prependNtimeListener = ntimes.bind(emitter, true)
  return emitter
}

module.exports = nify
