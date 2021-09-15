// All codes are psuedocodes
// node myFile.js

const pendingTimers = []
const pendingOSTasks = []
const pendingOperations = []

// New timers, tasks, operations are recorded from myFile running
myFile.runContents()

function shoudlContinue() {
  // Check one: Any pending setTimeout, setInterval, setImmediate?
  // Check two: ANy pending OS tasks? (like server listening to port)
  // Check three: Any pending long running operations? (like fs module)
  return pendingTimers.length || pendingOSTasks.length || pendingOperations.length
}

// Etire body executes in one 'tick' in a event loop
while(shoudlContinue()) {
  // 1) Node looks at pendingTimers and sees if any functions are ready to be called
  // 2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks
  // 3) Node pauses execution. Continues when...
  //    - a new pendingOSTask is done
  //    - a new pendingOperation is done
  //    - a timer is about to complete
  // 4) Node looks at pendingTimers. Call any setImmediate
  // 5) Handle any 'close' events
  /**
   * readStream.on('close', () => console.log('Cleanup code'))
  */
}

// exit back to terminal