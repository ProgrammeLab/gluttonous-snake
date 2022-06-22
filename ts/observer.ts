// observer.ts
abstract class Observer {
  public eventMap: Map<string, Function[]> = new Map();
  public emit(type: string) {
    if (this.eventMap.has(type)) {
      const events = this.eventMap.get(type);
      for (const event of events) {
        event();
      }
    } else {
      throw Error(`没有注册事件'${type}'`);
    }
  }
  public on(type: string, handler: Function) {
    if (this.eventMap.has(type)) {
      const events = [...this.eventMap.get(type), handler];
      this.eventMap.set(type, events);
    } else {
      this.eventMap.set(type, [handler]);
    }
  }
}