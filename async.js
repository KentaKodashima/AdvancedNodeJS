const https = require('https')

const start = Date.now()

function doRequest() {
  https
    .request('https://www.google.com', (res) => {
      res.on('data', () => {})
      res.on('end', () => console.log(Date.now() - start))
    })
    .end()
}

// Taks are completed asyncronously
//    libuv delegates HTTTP requests to the OS async helpers
// Since OS handles the request, the thread pool doesn't matter here
doRequest()
doRequest()
doRequest()
doRequest()
doRequest()
doRequest()
doRequest()


// Almost everything from the Node std library around networking for all OS's makes use of OS's async features.
// OS async tasks that are using the underlying OS are reflected in pendingOSTasks