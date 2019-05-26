class EventHandler {
    constructor() {
        this.listeners = [];
    }
    subscribe(listener) {
        this.listeners.push(listener);
    }
    unsubscribe(listener) {
        this.listeners = this.listeners.filter(l => l !== listener);
    }
    emit(event) {
        this.listeners.forEach(listener => listener(event))
    }
}

const eventHandler = new EventHandler;

export default eventHandler;