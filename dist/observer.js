// observer.ts
class Observer {
    constructor() {
        this.eventMap = new Map();
    }
    emit(type) {
        if (this.eventMap.has(type)) {
            const events = this.eventMap.get(type);
            for (const event of events) {
                event();
            }
        }
        else {
            throw Error(`没有注册事件'${type}'`);
        }
    }
    on(type, handler) {
        if (this.eventMap.has(type)) {
            const events = [...this.eventMap.get(type), handler];
            this.eventMap.set(type, events);
        }
        else {
            this.eventMap.set(type, [handler]);
        }
    }
}
