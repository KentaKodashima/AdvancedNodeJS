
// Changing thread pool size of libuv thread pool
// process.env.UV_THREADPOOL_SIZE = 2
process.env.UV_THREADPOOL_SIZE = 5
// 5 threads / 2 cores = about 2.5s

const crypto = require('crypto')

const start = Date.now()
// Both codes are executed at the SAME time
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('1:', Date.now() - start)
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('2:', Date.now() - start)
})

// If node were single threaded, total ammount of time would be about 2s!

// Libuv has a thread pool
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('3:', Date.now() - start)
})

crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('4:', Date.now() - start)
})

// The fifth call takes extra one second
// 2015 Macbook Pro has 2 core processer
//    pbkdf2 #1 - #4 are assigned to different threads in the thread pool
//    Then, thread #1 and #2 are assigned to the core processor #1,
//    amd thread #3 and #4 are assigned to the core processor #2.
//    Each function call takes now about 2s intead of 1s because each core processor has to do double work (2 threads)
crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
  console.log('5:', Date.now() - start)
})

// All fs module function are handled in the threadpool. And some of the crypto stuff.
// Taks running in the threadpool are the pendingOperations in the exampel array