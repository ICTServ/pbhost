const net = require('net')

class PortGet extends Promise {
  static get [Symbol.species] () { return Promise }
  errors = []
  constructor (portlist = [], host = '127.0.0.1') {
    let completers = null
    super((resolve, reject) => { completers = [resolve, reject] })
    const [resolve, reject] = completers
    if (typeof portlist === 'string') {
      host = portlist
      portlist = []
    }
    portlist = Array.isArray(portlist) ? portlist : [portlist]
    this.portlist = portlist.filter(Number.isInteger)
    this.server = net.createServer()
    this.server.unref()
    const [port = 0, ...spare] = this.portlist
    this.server.once('error', (err) => {
      this.errors.push(err)
      if (port !== 0) return new this.constructor(spare).then(resolve, reject)
      err.all = this.errors
      reject(err)
    })
    this.server.listen(port, host, () => {
      const { port } = this.server.address()
      this.server.close(() => resolve(port))
    })
  }
}

module.exports = (portlist, host) => new PortGet(portlist, host)