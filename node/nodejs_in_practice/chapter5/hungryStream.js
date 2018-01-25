var stream = require('stream')

HungryStream.prototype = Object.create(stream.Duplex.prototype, {
  constructor: { value: HungryStream }
})

function HungryStream (options) {
  stream.Duplex.call(this, options)
  this.waiting = false
}

HungryStream.prototype._write = function (chunk, encoding, callback) {
  this.waiting = false
  this.push('<' + chunk + '>')
  callback()
}

HungryStream.prototype._read = function (size) {
  if (!this.waiting) {
    this.push('Feed me data! > ')
    this.waiting = true
  }
}

var hungryStream = new HungryStream()
process.stdin.pipe(hungryStream).pipe(process.stdout)