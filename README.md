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