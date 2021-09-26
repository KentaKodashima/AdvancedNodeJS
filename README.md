# Advanced NodeJS

## What consists NodeJS
NodeJS consists of 50% JS (v8 engine) and 50% c++(libuv library).

## Threads in NodeJS
Whenever we execute some code, the computer stars something called "process". A process is an instance of a computer program that is being executed. Within a single process, we can have multiple things called "threads". A thread is like a TODO list that execute code from the top to the bottom.

### Scheduling
OS has a scheduler to decide which thread should be processed.

## Node even loop
Whenever we execute a ndoe code, it automatically creates one thread and executes all of the codes inside the thread. The event loop is like a control structure that decides what one thread should be doing at any given point in time.

## Is Node single thread?
Node event loop is a single threaded. However, some of Node framework/std lib are not single threaded meaning some of the codes are executed out side of the event loop or the single thread.

## Libuv thread pool
Libuv has a thread pool that consists of 4 threads by default. It computes some expensive tasks in the threads instead of Node event loop.

## Improving Node performance
### Use Node in 'Cluster' mode (recommended)
The cluster mode is used to have multiple copies of Node that are all running the server inside them. We cannot run Node in multiple threads, but by starting up multiple copies, we get multiple instances of event loop.

### Use worder threads (experimental)
Worker threads are used to do performannce work inside the app. They use the thread pool from libuv.

### Requests and express server
Whenever a request comes into the Node server, it gets processed in one single thread that contains the event loop, and the server generates a response.

### Cluster manager
The cluster manager is responsible for modeling the health of each instance of the app.

### Benchmarking
https://www.skenz.it/cs/ab

```
ab -c 1=2 -n 1=2 localhost:3000/
```

- -n 2 : Execute 3 time
- -c 2: 2 concurrent accesses

### Over allocating instannces
Creating many instances causes a problem depending on the hardware's CPU limit. For instance, if you have 6 clusters and there are 6 incoming requests, your machine's CPU tries to handle all requests at the same time. However, it would be overwork for your CPU ulenss your machine has 6 cores. This results in slower response speed.