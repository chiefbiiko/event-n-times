(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.eventNtimes = f()}})(function(){var define,module,exports;return (function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
