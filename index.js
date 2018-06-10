function ntimes (prepend, eventName, n, listener) {
  function proxy (...args) {
    if (++this._count > n) return this.removeListener(eventName, proxy)
    listener(...args)
  }
  this._ntimeListenersMap.set(listener, proxy)
  if (prepend) this.prependListener(eventName, proxy)
  else this.on(eventName, proxy)
}

function untimes (eventName, listener) {
  this.removeListener(eventName, this._ntimeListenersMap.get(listener))
}

function nify (emitter) {
  if (!emitter._ntimeListenersMap) emitter._ntimeListenersMap = new Map()
  emitter._count = 0
  emitter.ntimes = emitter.addNtimeListener = ntimes.bind(emitter, false)
  emitter.prependNtimeListener = ntimes.bind(emitter, true)
  emitter.offNtimeListener = emitter.removeNtimeListener = untimes
  return emitter
}

module.exports = nify
