process.env.UV_THREADPOOL_SIZE = 1
const cluster = require('cluster')
// Original cluster's isMaster property is alwaus true.
// console.log(cluster.isMaster)

// Is the file being executed in master mode?
if (cluster.isMaster) {
  // Cause index.js to be executed again but in child mode.
  cluster.fork()
  cluster.fork()
} else {
  // A child, going to act like a regular Node/Express server and do nothing else
  const express = require('express')
  const crypto = require('crypto')
  const app = express()

  // While this function is running, the event loop cannot do anything else.
  // function doWork(duration) {
  //   const start = Date.now()
  //   while (Date.now() - start < duration) {}
  // }



  app.get('/', (req, res) => {
    // doWork(5000) // Blocking the event loop
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi there')
    })
  })

  app.get('/fast', (req, res) => {
    res.send('This was fast.')
  })

  app.listen(3000)
}