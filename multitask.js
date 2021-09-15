// process.env.UV_THREADPOOL_SIZE = 5
const https = require('https')
const crypto = require('crypto')
const fs = require('fs')

const start = Date.now()

function doRequest() {
  https
    .request('https://www.google.com', (res) => {
      res.on('data', () => {})
      res.on('end', () => console.log(Date.now() - start))
    })
    .end()
}

function doHash() {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log('Hash:', Date.now() - start)
  })
}

doRequest()

fs.readFile('multitask.js', 'utf-8', () => {
  console.log('FS:', Date.now() - start)
})

doHash()
doHash()
doHash()
doHash()

// In what order do we see the condole.logs?

// Answer
/**
 * 233
 * Hash: 1639
 * FS: 1651
 * Hash: 1669
 * Hash: 1739
 * Hash: 1747
 */

// https makes use of OS's async feature, so it doesn't care other stuff and gets called immediately
// fs assigned to the thread #1 amd begin the initial work to send a request to the HD. While fs is waiting for the response from the HD, the thread #1 is free, so it executes hash #4s
// When it gets response from the HD, fs gets reassigned to the thread #2 (or other available thread)
// hash #1 assigned to the thred #2
// hash #2 assigned to the thred #3
// hash #3 assigned to the thred #4
