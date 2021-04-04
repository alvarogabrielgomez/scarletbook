const { EventEmitter } = require('events');

class ScarletEvents extends EventEmitter {
    constructor() {
        super();
    }

    onMany(arr, onEvent) {
        arr.forEach((eventName) => {
            this.on(eventName, onEvent);
        });
    }
}

module.exports = new ScarletEvents();