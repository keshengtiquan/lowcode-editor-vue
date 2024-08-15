class EventBus {
  events: Record<string, Set<(...args: any[]) => void>> = {}
  
  on(eventName: string, cb: (...args: any[]) => void){
    if(!this.events[eventName]) {
      this.events[eventName] = new Set()
    }
    this.events[eventName].add(cb)
  }
  
  emit(eventName: string, ...args: any[]) {
    this.events[eventName].forEach((cb) => cb(...args))
  }
  
  off(eventName: string, cb: (...args: any[]) => void) {
    this.events[eventName]?.delete(cb)
  }
  
  once(eventName: string, cb: (...args: any[]) => void) {
    const handle = (...args: any[]) => {
      cb(...args)
      this.off(eventName, handle)
    }
    this.on(eventName, handle)
  }
}

export const bus = new EventBus()